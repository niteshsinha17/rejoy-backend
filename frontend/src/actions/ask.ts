"use client";
import { AppRoutes } from "@/enum";
import { rejoyAiApi } from "@/services/rejoy-ai.service";
import { IAppDispatch, IStore } from "@/store";
import { askActions } from "@/store/reducer/ask";
import { getFilledRoutes } from "@/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { v1 } from "uuid";

export const handleInitiateThread =
  (userMsg: string, router: AppRouterInstance) => async (dispatch: IAppDispatch, getState: () => IStore) => {
    console.log(window);
    router.push(AppRoutes.SEARCH);
    const customId = v1();
    dispatch(
      askActions.initiateNewThread([{ id: customId, input: userMsg, pending: true, error: false, query: "", sources: [], text: [] }])
    );
    const result = await dispatch(rejoyAiApi.endpoints.initializeConversation.initiate({ message: userMsg }));
    if ("error" in result) {
      dispatch(
        askActions.updateNewThreadMessages({
          id: customId,
          input: userMsg,
          pending: false,
          error: true,
          error_message: "Failed to create a new thread",
          error_description: "Something went wrong while creating a new thread. Please try again later.",
          query: "",
          sources: [],
          text: [],
          follow_ups: [],
        })
      );
    } else {
      const message = result.data.response;
      const threadSlug = result.data.thread_slug;
      if (message.error) {
        dispatch(
          askActions.updateNewThreadMessages({
            id: customId,
            input: userMsg,
            pending: false,
            error: true,
            error_message: message.error_message,
            error_description: message.error_description,
            query: "",
            sources: [],
            text: [],
            follow_ups: [],
          })
        );
      } else {
        dispatch(
          askActions.updateNewThreadMessages({
            id: customId,
            input: userMsg,
            pending: false,
            error: false,
            query: message.query,
            sources: message.sources,
            text: message.text,
            follow_ups: message.follow_ups,
          })
        );

        dispatch(
          askActions.addPaginatedMessages({
            threadSlug: threadSlug,
            messages: [message],
            next: {
              start: null,
              end: null,
            },
          })
        );

        router.push(getFilledRoutes(AppRoutes.SEARCH_PAGE, { threadSlug }));
      }
    }
  };
