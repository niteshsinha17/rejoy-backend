"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reducer";
import { usePathParams } from "@/hooks";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@/icons";
import { chatActions, chatSelectors } from "@/store/reducer/chat-reducer/chat";
import chatApi from "@/services/chat-service/chat";
import Spinner from "@/ui/spinner";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { v1 } from "uuid";
import AiMessage from "../ai-message";
import AiMessageLoader from "../ai-message-loader";
import ChatInput from "../chat-input";
import { useTextToSpeech } from "../context/speek-context";
import FirstMessage from "../first-message";
import UserMessage from "../user-message";

const Messages = () => {
  const { conversationId: covId = "new" } = usePathParams();
  const messages = useAppSelector(
    chatSelectors.selectMessagesByConversationId(covId)
  );
  const autoPlay = useAppSelector((state) => state.chat.autoPlay);
  const autoPlayRef = useRef(autoPlay);
  autoPlayRef.current = autoPlay;
  const [getAgentResponse, { isLoading }] =
    chatApi.useGetAgentResponseMutation();
  const [getMessageList, messageListState] = chatApi.useLazyMessageListQuery();
  const dispatch = useAppDispatch();
  const lastMessageCount = useRef(0);
  const { speak } = useTextToSpeech();
  const chatContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCreateReply = (userMsg: string) => {
    const last4Messages = messages.slice(-4);
    const fakeId = v1();
    getAgentResponse({
      conversationId: covId === "new" ? undefined : covId,
      message: userMsg,
      chatHistory: last4Messages,
    })
      .unwrap()
      .then((response) => {
        if (autoPlayRef.current) {
          console.log("autoPlayRef.current", autoPlayRef.current);
          speak(
            response.agentResponse.message,
            response.agentResponse.id.toString()
          );
        }
        dispatch(
          chatActions.handleAgentResponse({
            fakeUserMessageId: fakeId,
            userMessage: response.userMessage || {
              id: fakeId,
              message: userMsg,
              sender: "user",
            },
            agentResponse: response.agentResponse,
            conversationId: response.conversationId || covId,
          })
        );
        if (response.conversationId && response.conversationId != covId) {
          dispatch(
            chatApi.util.prefetch(
              "conversationList",
              { limit: 10000, offset: 0 },
              {
                force: true,
              }
            )
          );
        }
        if (response.conversationId) router.push(`/${response.conversationId}`);
      });
    dispatch(
      chatActions.addMessage({
        conversationId: covId,
        message: {
          id: fakeId,
          message: userMsg,
          sender: "user",
        },
      })
    );
  };

  const toggleAutoPlay = () => {
    dispatch(chatActions.toggleAutoPlay());
  };

  useEffect(() => {
    if (chatContainer.current) {
      if (
        lastMessageCount.current === 0 ||
        messages.length - lastMessageCount.current == 1
      ) {
        chatContainer.current?.scrollTo({
          top: chatContainer.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    lastMessageCount.current = messages.length;
  }, [messages]);

  const fetchOldMessages = () => {
    const firstMessage = messages[0];
    getMessageList({
      conversationId: covId,
      limit: 10,
      cursor: (firstMessage?.id as number) ?? -1,
    })
      .unwrap()
      .then((response) => {
        dispatch(
          chatActions.prependMessages({
            conversationId: covId,
            messages: response.data,
          })
        );
      });
  };

  useEffect(() => {
    if (covId === "new") return;
    fetchOldMessages();
    dispatch(chatActions.clearMessages("new"));
  }, [covId]);

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-hidden">
        <div className="h-full relative">
          <div
            onClick={toggleAutoPlay}
            className="flex cursor-pointer justify-center items-center border rounded-full h-12 w-12 absolute right-10 top-2"
          >
            {autoPlay ? (
              <SpeakerWaveIcon className="icon-sm" />
            ) : (
              <SpeakerXMarkIcon className="text-slate-400 icon-sm" />
            )}
          </div>
          <div
            ref={chatContainer}
            className="h-full space-y-5 overflow-y-auto p-4"
          >
            <div
              id="message-container"
              className="max-w-screen-md mx-auto space-y-4 min-h-full"
            >
              {messageListState.data?.next && !messageListState.isFetching && (
                <div
                  onClick={fetchOldMessages}
                  className="text-center font-semibold cursor-pointer"
                >
                  Load more
                </div>
              )}
              {messageListState.isFetching && messages.length >= 10 && (
                <div className="flex justify-center">
                  <Spinner color="black" borderTopColor="white" />
                </div>
              )}

              {messages.map((message, index) => {
                if (message.sender == "agent")
                  return (
                    <AiMessage
                      withoutImage={index === 1 && covId === "new"}
                      message={message}
                      key={message.id}
                    />
                  );
                return (
                  <UserMessage message={message.message} key={message.id} />
                );
              })}
              {isLoading && <AiMessageLoader showImage={messages.length > 2} />}
            </div>
          </div>
          {covId === "new" && (
            <FirstMessage
              animate={messages.length > 0}
              hide={covId !== "new"}
              handleSubmit={handleCreateReply}
            />
          )}
          {covId !== "new" && messages.length == 0 && (
            <div className="absolute h-full w-full top-0 flex justify-center items-center">
              <Spinner color="black" borderTopColor="white" />
            </div>
          )}
        </div>
      </div>
      <div className="w-full p-4">
        <ChatInput isLoading={isLoading} handleSubmit={handleCreateReply} />
      </div>
    </div>
  );
};

export default Messages;
