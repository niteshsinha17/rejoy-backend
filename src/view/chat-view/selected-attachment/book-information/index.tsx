"use client";
import { AmazonLogo } from "@/icons";
// import BookOne from "../../../../public/images/book1.png";
import { useAppSelector } from "@/hooks";
import { IBookAttachment } from "@/models/chat";
import Link from "next/link";

const BookAttachment = () => {
  const book = useAppSelector(
    (state) => state.chat.selectedAttachment
  ) as IBookAttachment;

  if (!book) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <div className="p-5 h-full overflow-y-auto space-y-4">
          {/* <Image src={BookOne} height={150} alt="Book One" /> */}
          <div className="border-b pb-4 space-y-2">
            {/* <div className="text-[#828282]">
              September 5, 2023. Yale University Press
            </div> */}
            <div className="text-2xl font-serif font-medium">{book.name}</div>
            {/* <div className="text-[#828282]">
              John J. Mearsheimer and Sebastian Rosato
            </div> */}
          </div>

          <div>{book.description}</div>

          <Link
            href={`https://www.amazon.com/s?k=${book.name}`}
            target="_blank"
            className="flex w-fit text-sm gap-2 p-4 py-3 border border-black hover:text-white hover:bg-black font-medium items-center"
          >
            BUY NOW <AmazonLogo />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookAttachment;
