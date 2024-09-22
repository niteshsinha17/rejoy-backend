"use client";

export const useAuth = () => {
  const registerSuccess = async (token: string) => {
    // localStorageTransaction.clear();
    // localStorageTransaction.setItem("userToken", token);
    // window.location.assign(ROUTES.MANAGE_AGENTS); // clears redux automatically
  };

  return {
    registerSuccess,
  };
};
