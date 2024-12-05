"use client";
import Spinner from "@/ui/spinner";
import { cn } from "@/utils";
import ChatInput from "@/views/chat-view/chat-input";
import { useEffect, useState } from "react";

interface IBottomInputProps {
  isLoading: boolean;
  handleSubmit: (input: string) => void;
}

const Loader = () => {
  const loadingTexts = ["Analyzing your input", "Searching for relevant information", "Generating response"];

  const [currentText, setCurrentText] = useState(loadingTexts[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      if (index < loadingTexts.length) {
        setCurrentText(loadingTexts[index]);
      } else {
        clearInterval(interval); // Stop after reaching the last message
      }
    }, 2000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex gap-2 items-center text-base text-black bg-white">
      <Spinner />
      <span>{currentText}</span>
    </div>
  );
};

const BottomInput = (props: IBottomInputProps) => {
  return (
    <div className={cn("absolute bottom-0 w-full h-[80px] left-0 flex items-center px-5 bg-[#ffffffbc]")}>
      <div className="flex-1 max-w-screen-md">
        <div className="md:w-[70%]">
          {!props.isLoading ? (
            <ChatInput
              isLoading={false}
              handleSubmit={props.handleSubmit}
              placeholder="Ask here..."
            />
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomInput;
