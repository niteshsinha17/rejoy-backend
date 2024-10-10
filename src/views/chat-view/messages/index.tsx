"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reducer";
import { IDoctorProfile } from "@/models/doctor";
import chatApi from "@/services/chat-service/chat";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { v1 } from "uuid";
import AiMessage from "../ai-message";
import AiMessageLoader from "../ai-message-loader";
import ChatInput from "../chat-input";
import FirstMessage from "../first-message";
import UserMessage from "../user-message";

interface IMessageProps {
  doctorProfile: IDoctorProfile;
}
const Messages = (props: IMessageProps) => {
  const messages = useAppSelector((state) => state.chat.conversationMessages);
  const [getAgentResponse, { isLoading }] = chatApi.useGetAgentResponseMutation();
  const lastMessageCount = useRef(0);
  const dispatch = useAppDispatch();
  const chatContainer = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCreateReply = (userMsg: string) => {
    const last4Messages = messages.slice(-4);
    const fakeId = v1();
    // getAgentResponse({
    //   conversationId: covId === "new" ? undefined : covId,
    //   message: userMsg,
    //   chatHistory: last4Messages,
    // })
    //   .unwrap()
    //   .then((response) => {
    //     if (autoPlayRef.current) {
    //       console.log("autoPlayRef.current", autoPlayRef.current);
    //       speak(response.agentResponse.message, response.agentResponse.id.toString());
    //     }
    //     dispatch(
    //       chatActions.handleAgentResponse({
    //         fakeUserMessageId: fakeId,
    //         userMessage: response.userMessage || {
    //           id: fakeId,
    //           message: userMsg,
    //           sender: "user",
    //         },
    //         agentResponse: response.agentResponse,
    //         conversationId: response.conversationId || covId,
    //       })
    //     );
    //     if (response.conversationId && response.conversationId != covId) {
    //       dispatch(
    //         chatApi.util.prefetch(
    //           "conversationList",
    //           { limit: 10000, offset: 0 },
    //           {
    //             force: true,
    //           }
    //         )
    //       );
    //     }
    //     if (response.conversationId) router.push(`/${response.conversationId}`);
    //   });
    // dispatch(
    //   chatActions.addMessage({
    //     conversationId: covId,
    //     message: {
    //       id: fakeId,
    //       message: userMsg,
    //       sender: "user",
    //     },
    //   })
    // );
  };

  useEffect(() => {
    if (chatContainer.current) {
      if (lastMessageCount.current === 0 || messages.length - lastMessageCount.current == 1) {
        chatContainer.current?.scrollTo({
          top: chatContainer.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
    lastMessageCount.current = messages.length;
  }, [messages]);

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-hidden">
        <div className="h-full relative">
          <div
            ref={chatContainer}
            className="h-full space-y-5 overflow-y-auto p-4"
          >
            <div
              id="message-container"
              className="max-w-screen-md mx-auto space-y-4 min-h-full"
            >
              {messages.map((message, index) => {
                if (message.sender == "agent")
                  return (
                    <AiMessage
                      withoutImage={index === 1}
                      message={message}
                      key={message.id}
                    />
                  );
                return (
                  <UserMessage
                    message={message.message}
                    key={message.id}
                  />
                );
              })}
              {isLoading && <AiMessageLoader showImage={messages.length > 2} />}
            </div>
          </div>
          <FirstMessage
            hide={false}
            doctorProfile={props.doctorProfile}
            animate={messages.length > 0}
            handleSubmit={handleCreateReply}
          />
        </div>
      </div>
      <div className="w-full p-4">
        <ChatInput
          isLoading={isLoading}
          handleSubmit={handleCreateReply}
        />
      </div>
    </div>
  );
};

export default Messages;
