"use client";
import { ArrowCircleUpMark } from "@/icons";
import { TextareaAutosize } from "@mui/material";
// import { TextAreaAutoSizeInput } from "@/ui";
import { useState } from "react";

interface IChatInputProps {
  handleSubmit: (input: string) => void;
  isLoading: boolean;
}

const ChatInput = (props: IChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") return;
    props.handleSubmit(input);
    setInput("");
  };

  return (
    <div className="bg-[#F3F3F3] py-2 max-w-screen-md mx-auto rounded-[24px] flex items-center px-2">
      <TextareaAutosize
        value={input}
        disabled={props.isLoading}
        autoFocus
        onChange={(e) => setInput(e.target.value)}
        // setValue={(value) => setInput(value)}
        // handleSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit();
          }
        }}
        placeholder="Message John Mearsheimer"
        className="w-full bg-transparent border- px-3 outline-none resize-none text-base"
      />
      <button
        className="self-end"
        disabled={props.isLoading}
        onClick={handleSubmit}
      >
        <ArrowCircleUpMark />
      </button>
    </div>
  );
};

export default ChatInput;
