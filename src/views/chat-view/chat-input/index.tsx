"use client";
import { ArrowCircleUpMark } from "@/icons";
import { TextareaAutosize } from "@mui/material";
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
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            handleSubmit();
          }
        }}
        placeholder="Type a message..."
        className="w-full bg-transparent border- px-3 outline-none resize-none text-base"
      />
      <button
        className="self-end"
        disabled={props.isLoading}
        onClick={handleSubmit}
      >
        <ArrowCircleUpMark
          className="text-black"
          style={{
            height: 30,
            width: 30,
          }}
        />
      </button>
    </div>
  );
};

export default ChatInput;
