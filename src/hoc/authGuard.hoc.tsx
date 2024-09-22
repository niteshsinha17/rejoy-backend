"use client";
import GenericCircularLoader from "@/components/genericCircularLoader";
import { ROUTES } from "@/enum";
import { IChildrenProps } from "@/models";
import { useAuth } from "@/provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IAuthGuardProps extends IChildrenProps {
  noRedirect?: boolean;
  redirectUrl?: string;
  mountChild?: boolean;
}

const AuthGuard = (props: IAuthGuardProps) => {
  const noRedirect = props.noRedirect || false;
  const redirectUrl = props.redirectUrl || ROUTES.LOGIN;
  const mountChild = props.mountChild || false;
  const router = useRouter();
  const { auth, checkAuth } = useAuth();

  const onAuthFail = () => {
    if (!noRedirect) {
      router.push(redirectUrl);
    }
  };

  useEffect(() => {
    if (auth.initialized) return;
    checkAuth({
      onAuthFail,
    });
  }, []);

  if (!mountChild && !auth.initialized) {
    return (
      <div className="h-screen flex justify-center items-center">
        <GenericCircularLoader />
      </div>
    );
  }
  if (!auth.isAuthenticated && !mountChild) return null;

  return props.children;
};

export default AuthGuard;
