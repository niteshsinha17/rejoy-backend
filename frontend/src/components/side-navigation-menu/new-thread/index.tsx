import SearchPopUp from "@/components/search-popup";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";

const NewThread = () => {
  const searchPopUp = useModal();

  function onKeydown(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      searchPopUp.open(); // Open the modal when Cmd+K or Ctrl+K is pressed
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <div className="px-3">
      <button
        onClick={searchPopUp.open}
        className="font-medium flex items-center gap-4 text-black justify-between p-1 px-3 bg-white rounded-full border hover:border-primary"
      >
        New Thread
        <div className="flex gap-1 text-xs items-center text-slate-500">
          <span>⌘</span>
          <span>K</span>
        </div>
      </button>
      {searchPopUp.isOpen && <SearchPopUp onClose={searchPopUp.close} />}
    </div>
  );
};

export default NewThread;
