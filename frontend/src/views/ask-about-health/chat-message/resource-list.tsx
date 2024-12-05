import { IChatMessage } from "@/models/chat";
import Modal from "@/ui/modal";
import { truncate } from "lodash";
import Link from "next/link";

interface IResourceListProps {
  sources: IChatMessage["sources"];
  onClose: () => void;
  question: string;
}

const ResourceList = ({ sources, ...props }: IResourceListProps) => {
  return (
    <Modal
      open
      maxWidth="900px"
    >
      <Modal.Header className="h-auto py-3">
        <div>
          <Modal.HeaderTitle>{sources.length} Sources</Modal.HeaderTitle>
          <div>{props.question}</div>
        </div>
        <Modal.HeaderCloseButton onClick={props.onClose} />
      </Modal.Header>
      <Modal.Body className="overflow-y-scroll p-4">
        <div className="flex flex-col gap-3">
          {sources.map((source, index) => {
            return (
              <Link
                href={source.url}
                target="_blank"
                key={source.id}
                className="rounded-xl p-3 text-xs flex flex-col justify-between cursor-pointer bg-slate-100 space-y-1 border-[2px] hover:border-black"
              >
                <div className="font-medium text-black text-sm">
                  {index + 1}. {source.title}
                </div>

                <div className="flex items-center gap-1 font-medium">
                  <img
                    src={source.favicon}
                    width={25}
                    height={25}
                    alt="favicon"
                    className="rounded-lg"
                  />
                  {source.domain}
                </div>

                <div className="text-sm">
                  {truncate(source.description, {
                    length: 500,
                  })}
                </div>
              </Link>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResourceList;
