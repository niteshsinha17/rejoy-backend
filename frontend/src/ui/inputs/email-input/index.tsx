import TextInput, { ITextInputProps } from "../text-input";

const EmailInput = (props: ITextInputProps) => {
  return (
    <TextInput
      placeholder="Email"
      {...props}
      type="email"
      setValue={(name, value) => {
        props.setValue(name, value.toLowerCase());
      }}
    />
  );
};

export default EmailInput;
