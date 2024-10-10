import BookIcon from "@/../public/images/book.png";
import { useAppDispatch, useAppSelector } from "@/hooks/reducer";
import { IBookAttachment } from "@/models/chat";
import { chatActions } from "@/store/reducer/chat";
import { cn } from "@/utils";
import Image from "next/image";

interface IBooksProps {
  book: IBookAttachment;
}

const Books = ({ book }: IBooksProps) => {
  const selectedAttachment = useAppSelector((state) => state.chat.selectedAttachment);
  const dispatch = useAppDispatch();

  const handleSelectAttachment = () => {
    dispatch(chatActions.setSelectedAttachment(book));
  };

  return (
    <div
      onClick={handleSelectAttachment}
      className={cn("cursor-pointer flex items-center border rounded-xl p-5 py-3 gap-5", {
        "bg-[#F7F7F7]": selectedAttachment?.documentId === book.documentId,
      })}
    >
      <div>
        <Image
          src={BookIcon}
          alt="book"
          height={40}
          width={40}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="text-xl font-serif font-semibold">{book.name}</div>
        <div className="text-[#828282] truncate">{book.description}</div>
      </div>
    </div>
  );
};

export default Books;
