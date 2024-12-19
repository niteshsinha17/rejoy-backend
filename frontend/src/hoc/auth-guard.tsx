"use client";
import { AppRoutes } from "@/enum";
import { useAuth } from "@/hooks";
import { IChildrenProps } from "@/models/common/other";
import Spinner from "@/ui/spinner";
import DoctorRegistrationIncompleteView from "@/views/doctor-registration-incomplete-view";
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
    if (!auth.permissions.can_access_dashboard) {
      return <DoctorRegistrationIncompleteView />;
    }
    return props.children;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
};

export default AuthGuard;
