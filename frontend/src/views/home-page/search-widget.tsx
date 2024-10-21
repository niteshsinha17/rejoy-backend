"use client";

import { AppRoutes } from "@/enum";
import { SearchOutlineIcon } from "@/icons";
import { useRouter } from "next/navigation";

const SearchWidget = () => {
  const router = useRouter();

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="flex items-center border p-2 pr-3 rounded-full">
        <input
          type="text"
          autoFocus
          placeholder="Search anything about health..."
          className="flex-1 outline-none border-none px-2 max-sm:text-base text-lg"
        />
        <SearchOutlineIcon
          className="icon-sm cursor-pointer"
          onClick={() => {
            router.push(AppRoutes.REGISTER);
          }}
        />
      </div>
    </div>
  );
};

export default SearchWidget;
