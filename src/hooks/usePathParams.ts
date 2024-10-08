"use client";
import { useParams } from "next/navigation";

export const usePathParams = () => {
  const { conversationId } = useParams();

  return {
    conversationId: conversationId as string,
  };
};
