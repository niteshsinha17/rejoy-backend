import { authApi, coreApi, userApi } from "@/services";
import { agentAvailabilityApi } from "@/services/agent-availability.service";
import { agentApi } from "@/services/agent.service";
import { agentChatApi } from "@/services/agentChat.service";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./reducer/app.reducer";
import authReducer from "./reducer/auth.reducer";
import userReducer from "./reducer/user.reducer";

export const store = configureStore({
  reducer: {
    authReducer,
    userReducer,
    appReducer,
    [userApi.reducerPath]: userApi.reducer,
    [agentApi.reducerPath]: agentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [agentChatApi.reducerPath]: agentChatApi.reducer,
    [coreApi.reducerPath]: coreApi.reducer,
    [agentAvailabilityApi.reducerPath]: agentAvailabilityApi.reducer,
  },
  devTools: true,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(
      userApi.middleware,
      agentApi.middleware,
      authApi.middleware,
      agentChatApi.middleware,
      coreApi.middleware,
      agentAvailabilityApi.middleware
    );
  },
});

export type IStore = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
export const useAppUseSelector: TypedUseSelectorHook<IStore> = useSelector;
export const useAppDispatcher = () => useDispatch<IAppDispatch>();
