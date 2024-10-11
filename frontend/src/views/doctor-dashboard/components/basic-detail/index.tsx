"use client";
import { IDoctorProfile } from "@/models/doctor";
import { TextAreaInput, TextInput } from "@/ui/inputs";
import * as yup from "yup";
import Card from "../card";
import useForm from "../hooks/useForm";
interface IBasicDetailProps {
  basicDetail: IDoctorProfile["basicDetail"];
  save: (values: IDoctorProfile["basicDetail"]) => Promise<any>;
}

const validationSchema = yup.object().shape({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string(),
  address: yup.string(),
  phoneNumber: yup.string(),
  overview: yup.string(),
});

const BasicDetail = ({ basicDetail, save }: IBasicDetailProps) => {
  const formHook = useForm(basicDetail, save, validationSchema);
  const readOnly = !formHook.editMode;

  return (
    <Card
      title="Basic Detail"
      formHook={formHook}
    >
      <div className="grid grid-cols-2 gap-3">
        <TextInput
          label="First Name"
          name="firstName"
          variant="outline"
          readOnly={readOnly}
          placeholder="Enter first name"
          {...formHook.fieldConfig("firstName")}
        />
        <TextInput
          label="Last Name"
          variant="outline"
          readOnly={readOnly}
          placeholder="Enter first name"
          {...formHook.fieldConfig("lastName")}
        />
      </div>
      <TextInput
        label="Address"
        variant="outline"
        readOnly={readOnly}
        placeholder="Enter address"
        {...formHook.fieldConfig("address")}
      />
      <TextInput
        label="Phone Number"
        variant="outline"
        readOnly={readOnly}
        placeholder="Enter phone number"
        {...formHook.fieldConfig("phoneNumber")}
      />
      <TextAreaInput
        label="Overview"
        variant="outline"
        readOnly={readOnly}
        placeholder="Enter overview"
        {...formHook.fieldConfig("overview")}
      />
    </Card>
  );
};

export default BasicDetail;
