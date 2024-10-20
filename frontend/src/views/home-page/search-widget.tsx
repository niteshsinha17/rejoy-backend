import { SearchOutlineIcon } from "@/icons";

const SearchWidget = () => {
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="flex items-center border p-2 pr-3 rounded-full">
        <input
          type="text"
          autoFocus
          placeholder="Search anything about health..."
          className="flex-1 outline-none border-none px-2 max-sm:text-base text-lg"
        />
        <SearchOutlineIcon className="icon-sm" />
      </div>
    </div>
  );
};

export default SearchWidget;
