"use client";
import Messages from "./messages";
import SelectedAttachment from "./selected-attachment";

const ChatView = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-hidden">
        <Messages />
      </div>
      <SelectedAttachment />
    </div>
  );
};

export default ChatView;
