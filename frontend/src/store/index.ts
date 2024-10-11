import { authApi } from "@/services/auth.service";
import { userApi } from "@/services/user.service";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "./reducer/app";
import { authReducer } from "./reducer/auth";
import { chatReducer } from "./reducer/chat";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    app: appReducer,
    auth: authReducer,
    chat: chatReducer,
  },
  devTools: true,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(authApi.middleware, userApi.middleware);
  },
});

export type IStore = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
export const useAppUseSelector: TypedUseSelectorHook<IStore> = useSelector;
export const useAppDispatcher = () => useDispatch<IAppDispatch>();
