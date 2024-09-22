"use client";
import { Routes } from "@/enum";
import { authenticateTokenService } from "@/services";
import { useAppDispatcher, useAppUseSelector } from "@/store";
import { authActions } from "@/store/reducer";
import { localStorageTransaction } from "@/utils";

interface ICheckAuth {
  onAuthFail: () => void;
}

export const useAuth = () => {
  const auth = useAppUseSelector((state) => state.authReducer);
  const dispatch = useAppDispatcher();

  const login = (token: string) => {
    localStorageTransaction.clear();
    localStorageTransaction.setItem("userToken", token);
    window.location.assign(Routes.MANAGE_AGENTS); // clears redux automatically
  };

  const logout = () => {
    localStorageTransaction.clear();
    window.location.assign(Routes.LOGIN); // clears redux automatically
  };

  const registerSuccess = async (token: string) => {
    localStorageTransaction.clear();
    localStorageTransaction.setItem("userToken", token);
    window.location.assign(Routes.MANAGE_AGENTS); // clears redux automatically
  };

  const checkAuth = ({ onAuthFail }: ICheckAuth) => {
    dispatch(authActions.initialize());
    authenticateTokenService()
      .onSuccess((data) => {
        dispatch(
          authActions.login({
            token: data.token,
          })
        );
      })
      .onError((err) => {
        dispatch(authActions.authCheckFail());
        onAuthFail();
      })
      .execute();
  };

  return {
    auth: auth,
    login,
    registerSuccess,
    logout,
    checkAuth: checkAuth,
  };
};
