import Image from "next/image";
import { searchIcon } from "../../../public/icons";
const QuestionBar = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl mx-4 md:mx-0">
        <div className="relative">
          <div className="flex items-center max-w-2xl mx-auto rounded-full shadow-lg overflow-hidden bg-white border-[3px] border-transparent focus-within:border-black focus-within:ring-4">
            <input
              type="text"
              placeholder="Search anything about health..."
              className="flex-1 outline-none border-none py-1 px-4"
            />
            <span className="px-1">
              <Image
                src={searchIcon}
                alt="search-icon"
                height={40}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBar;
