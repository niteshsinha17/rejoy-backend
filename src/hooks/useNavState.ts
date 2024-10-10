import { useAppDispatcher, useAppUseSelector } from "@/store";
import { appActions } from "@/store/reducer/app";

const useNavState = () => {
  const isOpen = useAppUseSelector((state) => state.app.isSidebarOpen);
  const dispatch = useAppDispatcher();
  const open = () => dispatch(appActions.toggleSidebar());
  const close = () => dispatch(appActions.toggleSidebar());

  return { isOpen, open, close };
};

export default useNavState;
