"use client";

import { AppRoutes } from "@/enum";
import { useAuth } from "@/hooks";
import { useRouter } from "next/navigation";
import UserProfile from "../application-page-header/user-profile";

const AuthPanel = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated)
    return (
      <UserProfile
        onClick={() => {
          router.push(AppRoutes.DASHBOARD);
        }}
      />
    );

  return null;
};

export default AuthPanel;
