"use client";
import { ArrowCircleUpMark } from "@/icons";
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";

interface IChatInputProps {
  handleSubmit: (input: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const ChatInput = (props: IChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") return;
    props.handleSubmit(input);
    setInput("");
  };

  return (
    <div className="bg-slate-100 border max-w-screen-md mx-auto rounded-[24px] flex items-center py-1 px-2">
      <TextareaAutosize
        value={input}
        disabled={props.isLoading}
        autoFocus
        onChange={(e) => {
          setInput(e.target.value);
        }}
        maxRows={4}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder={props.placeholder ?? "Type a message..."}
        className="w-full bg-transparent border- px-3 outline-none resize-none py-1 text-sm"
      />
      <button
        className="self-end"
        disabled={props.isLoading}
        onClick={handleSubmit}
      >
        <ArrowCircleUpMark
          className="text-black"
          style={{
            height: 34,
            width: 34,
          }}
        />
      </button>
    </div>
  );
};

export default ChatInput;
