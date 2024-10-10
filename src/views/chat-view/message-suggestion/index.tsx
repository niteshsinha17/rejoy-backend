import { IDoctorProfile } from "@/models/doctor";
import { cn } from "@/utils";
import "./style.css";

const defaultMessageOptions = [
  {
    id: 1,
    message: "What are the common symptoms of hypertension?",
  },
  {
    id: 2,
    message: "How does diabetes affect cardiovascular health?",
  },
  {
    id: 3,
    message: "Explain the potential side effects of long-term antibiotic use.",
  },
];

interface IMessageSuggestionProps {
  doctorProfile: IDoctorProfile;
  handleSubmit: (message: string) => void;
}

const MessageSuggestion = (props: IMessageSuggestionProps) => {
  return (
    <div className={cn("bg-white w-full flex flex-col")}>
      <div className="flex justify-center flex-col items-center">
        <div className="py-6 text-4xl text-center font-serif">
          Hello, I’m Dr. {props.doctorProfile.basicDetail.firstName + " " + props.doctorProfile.basicDetail.lastName}’s AI. <br /> What
          would you like to discuss today?
        </div>
      </div>
      <div className="flex gap-3 justify-evenly">
        {defaultMessageOptions.map((item, idx) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                props.handleSubmit(item.message);
              }}
              className="flex items-center justify-center w-[300px] text-base py-4 pr-4 border-t border-[#E1E1E1] cursor-pointer"
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
