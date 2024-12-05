"use client";
import { TrashOutlineIcon } from "@/icons";
import { IDoctorProfile } from "@/models/doctor";
import { Button } from "@/ui";
import { TextInput } from "@/ui/inputs";
import { InputLabel } from "@/ui/inputs/base";
import { cn } from "@/utils";
import * as yup from "yup";
import Card from "../card";
import useForm from "../hooks/useForm";

interface IProfessionalDetailsProps {
  specialties: IDoctorProfile["specialties"];
  conditionsTreated: IDoctorProfile["conditionsTreated"];
  proceduresPerformed: IDoctorProfile["proceduresPerformed"];
  insuranceAccepted: IDoctorProfile["insuranceAccepted"];
  save: (values: {
    specialties: string[];
    conditionsTreated: string[];
    proceduresPerformed: string[];
    insuranceAccepted: string[];
  }) => Promise<any>;
}

const validationSchema = yup.object().shape({
  specialties: yup.array().of(yup.string().required("This field is required")),
  conditionsTreated: yup.array().of(yup.string().required("This field is required")),
  proceduresPerformed: yup.array().of(yup.string().required("This field is required")),
  insuranceAccepted: yup.array().of(yup.string().required("This field is required")),
});

interface IArrayFieldProps {
  formHook: ReturnType<typeof useForm>;
  label: string;
  name: string;
}

const ArrayField = ({ formHook, label, name }: IArrayFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <InputLabel>{label}</InputLabel>
      <div
        className={cn("flex flex-col", {
          "gap-2": formHook.editMode,
        })}
      >
        {formHook.form.values[name].map((_: string, index: number) => (
          <div
            className="flex gap-2 items-center"
            key={index}
          >
            <div className="flex-1">
              <TextInput
                variant="outline"
                autoFocus
                readOnly={!formHook.editMode}
                {...formHook.fieldConfig(`${name}.${index}`)}
              />
            </div>
            {formHook.editMode && (
              <Button
                onClick={() => {
                  formHook.form.setFieldValue(
                    name,
                    formHook.form.values[name].filter((_: string, i: number) => i !== index)
                  );
                }}
                variant="icon"
              >
                <TrashOutlineIcon />
              </Button>
            )}
          </div>
        ))}

        {formHook.editMode && (
          <div>
            <Button
              onClick={() => {
                formHook.form.setFieldValue(name, [...formHook.form.values[name], ""]);
              }}
              variant="text"
            >
              + Add More
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfessionalDetails = ({
  specialties,
  conditionsTreated,
  proceduresPerformed,
  insuranceAccepted,
  save,
}: IProfessionalDetailsProps) => {
  const formHook = useForm({ specialties, conditionsTreated, proceduresPerformed, insuranceAccepted }, save, validationSchema);

  return (
    <Card
      title="Professional Details"
      formHook={formHook}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <ArrayField
            formHook={formHook}
            label="Specialties"
            name="specialties"
          />

          <ArrayField
            formHook={formHook}
            label="Conditions Treated"
            name="conditionsTreated"
          />

          <ArrayField
            formHook={formHook}
            label="Procedures Performed"
            name="proceduresPerformed"
          />

          <ArrayField
            formHook={formHook}
            label="Insurance Accepted"
            name="insuranceAccepted"
          />
        </div>
      </div>
    </Card>
  );
};

export default ProfessionalDetails;
