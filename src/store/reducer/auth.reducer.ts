import { IAuthState, LoginPayload } from "@/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAuthState = {
  initialized: false,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  authCheckDone: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
    login: (state, action: PayloadAction<LoginPayload>) => {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        initialized: true,
        isLoading: false,
        authCheckDone: true,
      };
    },
    initialize: (state) => {
      return {
        ...state,
        initialized: true,
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

export default authSlice.reducer;
