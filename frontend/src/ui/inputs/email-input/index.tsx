import TextInput, { ITextInputProps } from "../text-input";

const EmailInput = (props: ITextInputProps) => {
  return (
    <TextInput
      placeholder="Email"
      {...props}
      type="email"
    />
  );
};

export default EmailInput;
