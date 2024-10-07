"use client";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { usePathParams } from "@/hooks";
import { ChevronLeft, ChevronRight, CloseIcon } from "@/icons";
import {
  IBookAttachment,
  IGoogleDriveAttachment,
  IYoutubeVideoAttachment,
} from "@/models/chat";
import { chatActions, chatSelectors } from "@/store/reducer/chat-reducer/chat";
import { cn } from "@/utils";
import { IconButton } from "@mui/material";
import { useMemo } from "react";

const ActionHeader = () => {
  const selectedAttachment = useAppSelector(
    (state) => state.chat.selectedAttachment
  );
  const { conversationId } = usePathParams();
  const messages = useAppSelector(
    chatSelectors.selectMessagesByConversationId(conversationId)
  );
  const dispatch = useAppDispatch();
  const flattenDocuments = useMemo(() => {
    const documents: (
      | IGoogleDriveAttachment
      | IYoutubeVideoAttachment
      | IBookAttachment
    )[] = [];

    messages.forEach((message) => {
      if (message.attachments) documents.push(...message.attachments);
    });

    return documents;
  }, [messages]);

  const selectedIndex = useMemo(() => {
    return flattenDocuments.findIndex(
      (doc) => doc.documentId === selectedAttachment?.documentId
    );
  }, [flattenDocuments, selectedAttachment]);

  const handleNext = () => {
    const nextIndex = selectedIndex + 1;
    if (nextIndex < flattenDocuments.length) {
      dispatch(chatActions.setSelectedAttachment(flattenDocuments[nextIndex]));
    }
  };

  const handlePrev = () => {
    const prevIndex = selectedIndex - 1;
    if (prevIndex >= 0) {
      dispatch(chatActions.setSelectedAttachment(flattenDocuments[prevIndex]));
    }
  };

  const handleClose = () => {
    dispatch(chatActions.setSelectedAttachment(null));
  };

  return (
    <div className="p-5 py-3 flex justify-between">
      <IconButton onClick={handleClose}>
        <CloseIcon className="text-black" />
      </IconButton>
      {selectedIndex != -1 && (
        <div className="flex gap-4 items-center">
          <ChevronLeft
            onClick={handlePrev}
            className={cn("text-black cursor-pointer", {
              "opacity-30 pointer-events-none": selectedIndex === 0,
            })}
          />
          <ChevronRight
            onClick={handleNext}
            className={cn("text-black cursor-pointer", {
              "opacity-30 pointer-events-none":
                selectedIndex === flattenDocuments.length - 1,
            })}
          />
        </div>
      )}
    </div>
  );
};

export default ActionHeader;
