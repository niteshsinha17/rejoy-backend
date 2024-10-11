"use client";
import { useAuth } from "@/hooks";
import { IChildrenProps } from "@/models/common/other";
import { useEffect } from "react";

const AuthProvider = (props: IChildrenProps) => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return props.children;
};

export default AuthProvider;
