"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { userApi } from "@/services/user.service";
import { askActions } from "@/store/reducer/ask";
import { Button } from "@/ui";
import { cn } from "@/utils";
import { useEffect, useRef } from "react";
import { v1 } from "uuid";
import ChatInput from "../chat-view/chat-input";
import UserMessage from "../chat-view/user-message";
import AiMessage from "./ai-message";
import AiMessageLoader from "./ai-message-loader";

const AskAboutHealth = () => {
  const messages = useAppSelector((state) => state.ask.conversationMessages);
  const initialized = useAppSelector((state) => state.ask.initialized);
  const hasHistory = useAppSelector((state) => state.ask.hasHistory);
  const [getAgentResponse, { isLoading }] = userApi.useAskMutation();
  const lastMessageCount = useRef(0);
  const dispatch = useAppDispatch();

  const handleCreateReply = (userMsg: string) => {
    const last4Messages = messages.slice(-4);
    getAgentResponse({
      message: userMsg,
      history: last4Messages,
    })
      .unwrap()
      .then((response) => {
        dispatch(
          askActions.addMessage({
            message: {
              id: v1(),
              message: response,
              sender: "agent",
            },
          })
        );
      });
    dispatch(
      askActions.addMessage({
        message: {
          id: v1(),
          message: userMsg,
          sender: "user",
        },
      })
    );
  };

  useEffect(() => {
    const container = document.getElementById("app-scrollable-view");
    if (!container) return;
    container.scrollTop = container.scrollHeight;
    lastMessageCount.current = messages.length;
  }, [messages]);

  useEffect(() => {
    dispatch(askActions.initialize());
  }, []);

  return (
    <div className="pb-[90px]">
      {messages.length > 0 && (
        <div className="flex justify-end pb-4">
          <Button
            variant="outline"
            color="black"
            size="xs"
            onClick={() => {
              dispatch(askActions.clearMessages());
            }}
          >
            New Conversation{" "}
          </Button>
        </div>
      )}
      {messages.map((message) => {
        if (message.sender == "agent")
          return (
            <AiMessage
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
      {isLoading && <AiMessageLoader />}
      <div
        className={cn("bg-white", {
          "flex flex-col gap-3 pt-6": messages.length === 0,
          "absolute bottom-0 w-full h-[80px] left-0": messages.length > 0,
        })}
      >
        {messages.length === 0 && <h3 className="text-center text-black">Ask anything about Health</h3>}
        <div
          className={cn({
            "max-w-screen-md mx-auto": messages.length > 0,
          })}
        >
          <div>
            <ChatInput
              isLoading={false}
              handleSubmit={handleCreateReply}
              placeholder="Ask here..."
            />
          </div>
        </div>
        {messages.length === 0 && <p className="text-center">The leading AI-powered medical information platform.</p>}
      </div>
    </div>
  );
};

export default AskAboutHealth;
