"use client";

import { AppRoutes } from "@/enum";
import { useAuth } from "@/hooks";
import { Button } from "@/ui";
import { useRouter } from "next/navigation";
import UserProfile from "../application-page-header/user-profile";

const AuthPanel = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (isAuthenticated)
    return (
      <UserProfile
        onClick={() => {
          router.push(AppRoutes.SEARCH);
        }}
      />
    );

  return (
    <Button
      variant="outline"
      color="black"
      href={AppRoutes.LOGIN}
    >
      Provider Login
    </Button>
  );
};

export default AuthPanel;
