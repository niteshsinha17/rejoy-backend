import { PencilOutlineIcon } from "@/icons";
import { Button } from "@/ui";
import { ReactNode } from "react";
import useForm from "../hooks/useForm";

interface ICardProps {
  title: string;
  formHook: ReturnType<typeof useForm>;
  children: ReactNode;
}

const Card = ({ formHook, ...props }: ICardProps) => {
  return (
    <div className="border rounded-lg shadow-sm">
      <div className="h-[70px] px-4 border-b flex justify-between items-center">
        <div className="text-base font-semibold text-black">{props.title}</div>
        {formHook.editMode ? (
          <div className="flex gap-3">
            <Button
              variant="outline"
              color="black"
              size="xs"
              onClick={formHook.handleCancel}
              disabled={formHook.form.isSubmitting}
            >
              Cancel
            </Button>
            <Button
              size="xs"
              onClick={formHook.handleSave}
              loading={formHook.form.isSubmitting}
            >
              Save
            </Button>
          </div>
        ) : (
          <Button
            variant="icon"
            onClick={formHook.handleEdit}
          >
            <PencilOutlineIcon />
          </Button>
        )}
      </div>

      <div className="p-4 px-4 flex flex-col gap-3">{props.children}</div>
    </div>
  );
};

export default Card;
