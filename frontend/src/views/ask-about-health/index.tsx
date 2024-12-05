"use client";
import { useAppDispatch, useAppSelector, usePathParams } from "@/hooks";
import { askActions } from "@/store/reducer/ask";
import { getRandomNumberList } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { handleInitiateThread } from "../../actions/ask";
import ChatInput from "../chat-view/chat-input";
import BottomInput from "./buttom-input";
import ChatMessage from "./chat-message";
import { SAMPLE_QUESTIONS } from "./constants";
import Conversation from "./conversation";

const AskAboutHealth = () => {
  const { threadSlug } = usePathParams();
  const messages = useAppSelector((state) => state.ask.newThreadMessages);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCreateReply = (userMsg: string) => {
    dispatch(handleInitiateThread(userMsg, router));
  };

  const onErrorClose = () => {
    dispatch(askActions.clearNewThreadMessages());
  };

  const sampleQuestions = useMemo(() => {
    const indexes = getRandomNumberList(0, SAMPLE_QUESTIONS.length - 1, 4);
    return indexes.map((index) => SAMPLE_QUESTIONS[index]);
  }, []);

  useEffect(() => {
    if (threadSlug) {
      dispatch(askActions.clearNewThreadMessages());
    }
  }, [threadSlug]);

  if (threadSlug) {
    return <Conversation threadSlug={threadSlug} />;
  }

  return (
    <div>
      {messages.length > 0 && (
        <ChatMessage
          message={messages[messages.length - 1]}
          onErrorClose={onErrorClose}
          handleFollowUp={() => {}}
        />
      )}
      {messages.length === 0 && (
        <div className="bg-white flex flex-col gap-3 pt-6 max-w-screen-md mx-auto">
          <h3 className="text-center text-black font-medium mb-4">Ask anything about Health</h3>
          <div>
            <div>
              <ChatInput
                isLoading={false}
                handleSubmit={handleCreateReply}
                placeholder="Ask here..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {sampleQuestions.map((question, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-2 p-1 cursor-pointer border hover:bg-slate-100 rounded-lg"
                  onClick={() => {
                    handleCreateReply(question.question);
                  }}
                >
                  <div>{question.emoji}</div>
                  <div>{question.question}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {messages.length > 0 && !messages[messages.length - 1]?.error && (
        <BottomInput
          handleSubmit={handleCreateReply}
          isLoading
        />
      )}
    </div>
  );
};

export default AskAboutHealth;
