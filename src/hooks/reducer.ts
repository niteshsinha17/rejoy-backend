import { IAppDispatch, RootState } from "@/store/reducer/chat-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<IAppDispatch>();
