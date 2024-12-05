"use client";
import { useParams } from "next/navigation";

export const usePathParams = () => {
  const { username, threadSlug } = useParams();

  return {
    username: username as string,
    threadSlug: threadSlug as string,
  };
};
