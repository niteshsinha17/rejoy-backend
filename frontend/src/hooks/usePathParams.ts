"use client";
import { useParams } from "next/navigation";

export const usePathParams = () => {
  const { username } = useParams();

  return {
    username: username as string,
  };
};
