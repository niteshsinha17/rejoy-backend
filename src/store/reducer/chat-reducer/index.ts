import chatApi from "@/services/chat-service/chat";
import { configureStore } from "@reduxjs/toolkit";
import { chatReducer } from "./chat";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chat: chatReducer,
      [chatApi.reducerPath]: chatApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(chatApi.middleware),
    devTools: true,
  });
};

export type IStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<IStore["getState"]>;
export type IAppDispatch = IStore["dispatch"];
