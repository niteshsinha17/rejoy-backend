import type { IAuthState } from "@/models/auth";
import type { IPermissionResponse } from "@/models/permission";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  initialized: false,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  permissions: {
    can_access_dashboard: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
    login: (
      state,
      action: PayloadAction<{
        token: string;
        permissions: IPermissionResponse;
      }>
    ) => {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        initialized: true,
        isLoading: false,
        permissions: action.payload.permissions,
      };
    },
    initialize: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    authCheckFail: (state) => {
      return {
        ...state,
        initialized: true,
        isLoading: false,
        authCheckDone: true,
      };
    },
    reset: () => {
      return initialState;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
