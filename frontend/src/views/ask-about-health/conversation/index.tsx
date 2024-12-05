import { useAppDispatch } from "@/hooks";
import { rejoyAiApi } from "@/services/rejoy-ai.service";
import { askActions, askSelectors } from "@/store/reducer/ask";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { v1 } from "uuid";
import BottomInput from "../buttom-input";
import ChatMessage from "../chat-message";

interface IConversationProps {
  threadSlug: string;
}
const Conversation = (props: IConversationProps) => {
  const [getMessages, messagesApiQuery] = rejoyAiApi.useLazyThreadMessagesQuery();
  const [addThreadMessage, addMsgMutation] = rejoyAiApi.useAddThreadMessageMutation();
  const messages = useSelector(askSelectors.selectMessagesByConversationId(props.threadSlug));
  const dispatch = useAppDispatch();

  const handleCreateReply = (userMsg: string) => {
    const customId = v1();
    dispatch(
      askActions.appendMessages({
        threadSlug: props.threadSlug,
        messages: [{ id: customId, input: userMsg, pending: true, error: false, query: "", sources: [], text: [] }],
      })
    );
    addThreadMessage({ threadSlug: props.threadSlug, message: userMsg })
      .unwrap()
      .then((response) => {
        dispatch(
          askActions.updateMessage({
            threadSlug: props.threadSlug,
            message: response,
            id: customId,
          })
        );
      });
  };

  useEffect(() => {
    if (messages.length === 0) {
      getMessages({ threadSlug: props.threadSlug })
        .unwrap()
        .then((response) => {
          dispatch(askActions.addPaginatedMessages({ threadSlug: props.threadSlug, messages: response.results, next: response.next }));
        });
    }
  }, []);

  useEffect(() => {
    const msgContainers = document.querySelectorAll(".message-container");
    const lastContainer = msgContainers[msgContainers.length - 1] as HTMLDivElement;
    const scrollViewContainer = document.getElementById("app-scrollable-view");
    if (lastContainer && scrollViewContainer) {
      lastContainer.scrollIntoView({ behavior: "instant", block: "start", inline: "start" });
    }
  }, [messages.length]);

  return (
    <div className="pb-[90px] space-y-5">
      {messages.map((message, index) => {
        return (
          <div
            key={message.id}
            className="border-b pb-4"
          >
            <ChatMessage
              message={message}
              handleFollowUp={handleCreateReply}
            />
          </div>
        );
      })}
      <BottomInput
        handleSubmit={handleCreateReply}
        isLoading={addMsgMutation.isLoading}
      />
    </div>
  );
};

export default Conversation;
