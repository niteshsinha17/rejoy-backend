import { BaseInput, IInputProps, InputWrapper } from "../base";

export interface ITextInputProps extends IInputProps {}

const TextInput = ({ error, leadingVisual, trailingVisual, ...props }: ITextInputProps) => {
  return (
    <InputWrapper
      error={error}
      leadingVisual={leadingVisual}
      trailingVisual={trailingVisual}
    >
      <BaseInput {...props} />
    </InputWrapper>
  );
};

export default TextInput;
