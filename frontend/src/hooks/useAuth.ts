"use client";
import { AppRoutes } from "@/enum";
import { authApi } from "@/services/auth.service";
import { useAppDispatcher, useAppUseSelector } from "@/store";
import { authActions } from "@/store/reducer/auth";
import { localStorageTransaction } from "@/utils";

export const useAuth = () => {
  const auth = useAppUseSelector((state) => state.auth);
  const [authenticateToken] = authApi.useAuthenticateTokenMutation();
  const dispatch = useAppDispatcher();

  const login = (token: string) => {
    localStorageTransaction.clear();
    localStorageTransaction.setItem("userToken", token);
    window.location.assign(AppRoutes.SEARCH); // clears redux automatically
  };

  const logout = () => {
    localStorageTransaction.clear();
    window.location.assign(AppRoutes.LOGIN); // clears redux automatically
  };

  const registerSuccess = async (token: string) => {
    localStorageTransaction.clear();
    localStorageTransaction.setItem("userToken", token);
    window.location.assign(AppRoutes.SEARCH); // clears redux automatically
  };

  const checkAuth = () => {
    dispatch(authActions.initialize());
    const token = localStorageTransaction.getItem("userToken");
    if (token) {
      authenticateToken()
        .unwrap()
        .then((res) => {
          dispatch(authActions.login({ token, permissions: res.permissions }));
        })
        .catch(() => {
          dispatch(authActions.authCheckFail());
        });
    } else {
      dispatch(authActions.authCheckFail());
    }
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    initialized: auth.initialized,
    permissions: auth.permissions,
    login,
    registerSuccess,
    logout,
    checkAuth,
  };
};
