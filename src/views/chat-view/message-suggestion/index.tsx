import { cn } from "@/utils";
import "./style.css";

const defaultMessageOptions = [
  {
    id: 1,
    message: "Describe the changing power dynamics with China’s rise.",
  },
  {
    id: 2,
    message: "What strategies should states use in current geopolitics?",
  },
  {
    id: 3,
    message: "Summarize your book: The Tragedy of Great Power Politics.",
  },
];

interface IMessageSuggestionProps {
  handleSubmit: (message: string) => void;
}

const MessageSuggestion = (props: IMessageSuggestionProps) => {
  return (
    <div className={cn("bg-white w-full flex flex-col")}>
      <div className="flex justify-center flex-col items-center">
        <div className="py-6 text-4xl text-center font-serif">
          Hello, I’m John Mearsheimer’s AI. <br /> What would you like to
          discuss today?
        </div>
      </div>
      <div className="flex gap-6 justify-evenly">
        {defaultMessageOptions.map((item, idx) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                props.handleSubmit(item.message);
              }}
              className="flex items-center justify-center w-[200px] text-base py-4 pr-4 border-t border-[#E1E1E1] cursor-pointer"
            >
              {item.message}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageSuggestion;
