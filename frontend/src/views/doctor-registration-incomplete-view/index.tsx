import { checkNpi } from "@/actions/check-npi";
import { useAuth } from "@/hooks";
import { userApi } from "@/services/user.service";
import { Button } from "@/ui";
import { NumberInput, TextInput } from "@/ui/inputs";
import Spinner from "@/ui/spinner";
import { formikFieldConfig } from "@/utils";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import { Logo } from "../../../public/images";

interface IFormProps {
  firstName: string;
  lastName: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  npiNumber: Yup.string().required("NPI number is required").length(10, "NPI number must be 10 digits"),
  checked: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
});

const Form = (props: IFormProps) => {
  const [updateNpi] = userApi.useUpdateDoctorNpiNumberMutation();
  const { checkAuth } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: props.firstName,
      lastName: props.lastName,
      npiNumber: "",
      checked: false,
    },

    validationSchema,
    onSubmit: async (values) => {
      const npiNumber = values.npiNumber;
      const res = await checkNpi(npiNumber);
      if (res) {
        await updateNpi({
          npi_number: npiNumber,
          first_name: values.firstName,
          last_name: values.lastName,
        })
          .unwrap()
          .then(() => {
            checkAuth();
          });
      } else {
        formik.setFieldError("npiNumber", "Invalid NPI number");
      }
    },
    enableReinitialize: true,
  });

  const fieldConfig = formikFieldConfig(formik);

  return (
    <div className="flex-1 p-4">
      <Image
        src={Logo}
        alt="logo"
        height={60}
        width={100}
        className="mx-auto w-auto"
      />

      <div className="text-center text-lg mt-4 text-black font-medium">Complete your registration</div>

      <div className="space-y-3 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <TextInput
              name="firstName"
              label="First Name"
              {...fieldConfig("firstName")}
            />
          </div>
          <div>
            <TextInput
              name="lastName"
              label="Last Name"
              {...fieldConfig("lastName")}
            />
          </div>
        </div>
        <div>
          <div className="font-medium text-black">Verify your health care professional credentials</div>
          <div className="text-sm my-2">
            Only verified health care professionals can use this platform. Please enter your NPI number to verify your credentials. Ask
            unlimited questions and get answers.
          </div>
          <NumberInput
            name="npiNumber"
            label="NPI Number"
            maxLength={10}
            {...fieldConfig("npiNumber")}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            {...fieldConfig("checked")}
          />
          <label
            htmlFor="terms"
            className="text-sm"
          >
            I agree to the{" "}
            <a
              href="#"
              className="text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>

        <Button
          fullWidth
          loading={formik.isSubmitting}
          onClick={formik.handleSubmit}
          disabled={!formik.isValid}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

const DoctorRegistrationIncompleteView = () => {
  const { data: doctorProfile, ...doctorProfileQuery } = userApi.useDoctorProfileQuery();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-screen-sm border max-auto flex-1 p-4 shadow-2xl rounded-lg">
        {doctorProfileQuery.isLoading ? (
          <div className="h-[200px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Form
            firstName={doctorProfile?.basicDetail.firstName ?? ""}
            lastName={doctorProfile?.basicDetail.lastName ?? ""}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorRegistrationIncompleteView;
