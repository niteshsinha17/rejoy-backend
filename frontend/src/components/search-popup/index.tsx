"use client";
import { handleInitiateThread } from "@/actions/ask";
import { useAppDispatch } from "@/hooks";
import Modal from "@/ui/modal";
import { getRandomNumberList } from "@/utils";
import { SAMPLE_QUESTIONS } from "@/views/ask-about-health/constants";
import ChatInput from "@/views/chat-view/chat-input";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface ISearchPopUpProps {
  onClose: () => void;
}

const SearchPopUp = (props: ISearchPopUpProps) => {
  const sampleQuestions = useMemo(() => {
    const indexes = getRandomNumberList(0, SAMPLE_QUESTIONS.length - 1, 4);
    return indexes.map((index) => SAMPLE_QUESTIONS[index]);
  }, []);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleCreateReply = (userMsg: string) => {
    dispatch(handleInitiateThread(userMsg, router));
    props.onClose();
  };

  return (
    <Modal
      open
      width="90%"
      maxWidth={700}
      onClose={props.onClose}
    >
      <Modal.Body>
        <div className="font-medium text-center pb-4 text-xl">Search Here</div>
        <ChatInput
          isLoading={false}
          handleSubmit={handleCreateReply}
          placeholder="What would you like to know?"
        />

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
      </Modal.Body>
    </Modal>
  );
};

export default SearchPopUp;
