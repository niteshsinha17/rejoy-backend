"use client";
import { AppRoutes } from "@/enum";
import { useAuth } from "@/hooks";
import { IChildrenProps } from "@/models/common/other";
import Spinner from "@/ui/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IAuthGuardProps extends IChildrenProps {}

const AuthGuard = (props: IAuthGuardProps) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.initialized && !auth.isAuthenticated) {
      router.push(AppRoutes.LOGIN);
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.initialized]);

  if (auth.isAuthenticated) {
    return props.children;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
};

export default AuthGuard;
