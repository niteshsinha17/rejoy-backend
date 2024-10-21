import { IAppDispatch, IStore } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<IStore> = useSelector;
export const useAppDispatch = () => useDispatch<IAppDispatch>();
