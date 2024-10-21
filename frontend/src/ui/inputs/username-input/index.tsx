import TextInput, { ITextInputProps } from "../text-input";

const UsernameInput = (props: ITextInputProps) => {
  return (
    <TextInput
      {...props}
      placeholder="Username"
      // validateRegex={""} // TODO: Add when required
    />
  );
};

export default UsernameInput;
