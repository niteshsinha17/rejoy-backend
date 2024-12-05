"use client";
import { IDoctorProfile } from "@/models/doctor";

interface IMessageProps {
  doctorProfile: IDoctorProfile;
}

const Messages = (props: IMessageProps) => {
  // const messages = useAppSelector((state) => state.chat.messages);
  // const initialized = useAppSelector((state) => state.chat.initialized);
  // const hasHistory = useAppSelector((state) => state.chat.hasHistory);
  // const [getAgentResponse, { isLoading }] = userApi.useGenerateUserResponseMutation();
  // const lastMessageCount = useRef(0);
  // const { username } = usePathParams();
  // const dispatch = useAppDispatch();
  // const chatContainer = useRef<HTMLDivElement>(null);

  // const handleCreateReply = (userMsg: string) => {
  //   const last4Messages = messages.slice(-4);
  //   getAgentResponse({
  //     message: userMsg,
  //     history: last4Messages,
  //     username: username,
  //   })
  //     .unwrap()
  //     .then((response) => {
  //       dispatch(
  //         chatActions.addMessage({
  //           message: {
  //             id: v1(),
  //             message: response,
  //             sender: "agent",
  //           },
  //         })
  //       );
  //     });
  //   dispatch(
  //     chatActions.addMessage({
  //       message: {
  //         id: v1(),
  //         message: userMsg,
  //         sender: "user",
  //       },
  //     })
  //   );
  // };

  // useEffect(() => {
  //   if (chatContainer.current) {
  //     if (lastMessageCount.current === 0 || messages.length - lastMessageCount.current == 1) {
  //       chatContainer.current?.scrollTo({
  //         top: chatContainer.current.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  //   lastMessageCount.current = messages.length;
  // }, [messages]);

  // useEffect(() => {
  //   dispatch(chatActions.initialize());
  // }, []);

  // return (
  //   <div className="flex flex-col h-full relative">
  //     <div className="flex justify-end p-2">
  //       <Button
  //         variant="outline"
  //         color="black"
  //         size="xs"
  //         onClick={() => {
  //           dispatch(chatActions.clearMessages());
  //         }}
  //         startIcon={<TrashOutlineIcon className="icon-xs" />}
  //       >
  //         Clear Chat
  //       </Button>
  //     </div>
  //     <div className="flex-1 overflow-hidden">
  //       <div className="h-full relative">
  //         <div
  //           ref={chatContainer}
  //           className="h-full space-y-5 overflow-y-auto p-4"
  //         >
  //           <div
  //             id="message-container"
  //             className="max-w-screen-md mx-auto space-y-4 min-h-full"
  //           >
  //             {messages.map((message, index) => {
  //               if (message.sender == "agent")
  //                 return (
  //                   <AiMessage
  //                     message={message}
  //                     key={message.id}
  //                     doctorProfile={props.doctorProfile}
  //                   />
  //                 );
  //               return (
  //                 <UserMessage
  //                   message={message.message}
  //                   key={message.id}
  //                 />
  //               );
  //             })}
  //             {isLoading && (
  //               <AiMessageLoader
  //                 doctorProfile={props.doctorProfile}
  //                 showImage={messages.length > 2}
  //               />
  //             )}
  //           </div>
  //         </div>
  //         {!hasHistory && (
  //           <FirstMessage
  //             hide={messages.length >= 1}
  //             doctorProfile={props.doctorProfile}
  //             animate={messages.length > 0}
  //             handleSubmit={handleCreateReply}
  //           />
  //         )}
  //       </div>
  //     </div>
  //     <div
  //       className={cn("w-full p-4", {
  //         "pointer-events-none": !initialized,
  //       })}
  //     >
  //       <ChatInput
  //         isLoading={isLoading}
  //         handleSubmit={handleCreateReply}
  //       />
  //     </div>
  //   </div>
  // );
  return <>Page not exists</>;
};

export default Messages;
