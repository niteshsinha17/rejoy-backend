"use client";
import { ROUTES } from "@/enum";
import { localStorageTransaction } from "@/utils";
import { log } from "console";
export const useAuth= () => {

  const login = (token: string) => {
    localStorageTransaction.clear();
    localStorageTransaction.setItem("userToken", token);
    window.location.assign(ROUTES.MANAGE_AGENTS); // clears redux automatically
  };
  return {
    login
  }
}
