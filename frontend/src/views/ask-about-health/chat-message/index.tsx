import { BoxLoader } from "@/components";
import useModal from "@/hooks/useModal";
import { CloseIcon } from "@/icons";
import { IChatMessage } from "@/models/chat";
import { cn } from "@/utils";
import { IconButton } from "@mui/material";
import { truncate } from "lodash";
import Link from "next/link";
import ResourceList from "./resource-list";

interface IChatMessageProps {
  message: IChatMessage;
  onErrorClose?: () => void;
  handleFollowUp: (question: string) => void;
}

const Loader = () => {
  return (
    <div className="mt-3 border-l-[2px] pl-3">
      <div className="flex gap-2">
        <BoxLoader
          height={12}
          width={12}
          className="rounded-full"
        />
        <BoxLoader
          height={12}
          width={100}
        />
      </div>
      <div className="mt-3 flex gap-2">
        <BoxLoader
          height={100}
          width={100}
        />
        <BoxLoader
          height={100}
          width={100}
        />
        <BoxLoader
          height={100}
          width={100}
        />
      </div>
      <div className="mt-3">
        <BoxLoader
          height={12}
          width={400}
        />
        <BoxLoader
          height={12}
          width={300}
          className="mt-1"
        />
      </div>
    </div>
  );
};

interface IChatMessageTextBlockProps {
  block: IChatMessage["text"][0];
}
const ChatMessageTextBlock = ({ block }: IChatMessageTextBlockProps) => {
  return (
    <div className="text-sm space-y-2">
      <div dangerouslySetInnerHTML={{ __html: block.text }} />
      {block.heading && <div className="font-medium text-black">{block.heading}</div>}

      {block.list_items && (
        <ul className="list-disc pl-5">
          {block.list_items.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      )}

      {block.type === "table" && (
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {block.table_columns?.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table_rows?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ChatMessage = ({ message, ...props }: IChatMessageProps) => {
  const sourceListModal = useModal();

  return (
    <div
      className={cn("message-container pt-[50px]", {
        "min-h-[80vh]": message.pending,
      })}
    >
      <h2 className="font-medium text-2xl text-black message-user-input">{message.input}</h2>
      {message.pending && <Loader />}
      {!message.pending &&
        (message.error ? (
          <div className="bg-[#fff4e5] text-[#9f462a] p-4 rounded-xl mt-3">
            <div className="flex justify-between">
              <div className=" font-semibold text-base">{message.error_message}</div>
              <IconButton
                size="small"
                onClick={props.onErrorClose}
              >
                <CloseIcon className="icon-xs text-[#9f462a]" />
              </IconButton>
            </div>
            <div className="mt-2">
              <div>{message.error_description}</div>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <div className="text-base">
              <div>Expanded Question : {message.query}</div>
            </div>
            <div className="mt-3">
              <div className="flex gap-2 text-black items-center text-base font-medium">
                <div className="">🔍</div>
                Sources
              </div>

              <div className="mt-1">
                <div className="flex gap-2">
                  {message.sources.map((source, index) => {
                    if (index < 3) {
                      return (
                        <Link
                          href={source.url}
                          target="_blank"
                          key={source.id}
                          className="w-[200px] bg-slate-100 rounded-lg p-2 text-xs flex flex-col justify-between cursor-pointer"
                        >
                          <div className="font-medium h-[80px] text-black">
                            {truncate(source.title, {
                              length: 80,
                              omission: "...",
                            })}
                          </div>

                          <div className="flex items-center gap-1 ">
                            <img
                              src={source.favicon}
                              width={25}
                              height={25}
                              alt="favicon"
                              className="rounded-lg"
                            />
                            {source.domain}
                          </div>
                        </Link>
                      );
                    }
                    return null;
                  })}

                  {message.sources.length > 3 && (
                    <div
                      onClick={sourceListModal.open}
                      className="w-[200px] bg-slate-100 rounded-lg p-2 text-xs cursor-pointer"
                    >
                      <div className="text-black font-medium h-[80px]">View {message.sources.length - 3} more</div>
                      <div className="flex gap-1 items-center">
                        {message.sources.slice(3).map((source) => {
                          return (
                            <img
                              key={source.id}
                              src={source.favicon}
                              width={25}
                              height={25}
                              alt="favicon"
                              className="rounded-lg"
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {sourceListModal.isOpen && (
                    <ResourceList
                      sources={message.sources}
                      question={message.query}
                      onClose={sourceListModal.close}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex gap-2 text-black items-center text-base font-medium">
                <div className="">💡</div>
                Answer
              </div>
              <div className="max-w-screen-md mt-1 text-base space-y-2">
                {message.text?.map((block, index) => {
                  return (
                    <ChatMessageTextBlock
                      key={index}
                      block={block}
                    />
                  );
                })}
              </div>
            </div>
            {message.follow_ups && (
              <div className="mt-3 border-t">
                <div className="flex gap-2 text-black py-3 items-center text-base font-medium">
                  <div className="">🤔</div>
                  Follow Up Questions
                </div>
                <div>
                  {message.follow_ups.map((followUp, index) => {
                    return (
                      <div
                        key={index}
                        className="border-t py-2 cursor-pointer hover:bg-slate-100 px-2"
                        onClick={() => props.handleFollowUp(followUp)}
                      >
                        <div className="text-base">{followUp}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default ChatMessage;
