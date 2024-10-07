import { IAuthState } from "@/models/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  initialized: false,
  token: null,
  isLoading: false,
  isAuthenticated: false,
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
      }>
    ) => {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        initialized: true,
        isLoading: false,
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
