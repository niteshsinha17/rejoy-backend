import { BaseInput, IInputProps, InputWrapper } from "../base";

export interface ITextInputProps extends IInputProps {}

const TextInput = ({ error, leadingVisual, variant, trailingVisual, label, ...props }: ITextInputProps) => {
  return (
    <InputWrapper
      error={error}
      readOnly={props.readOnly}
      label={label}
      leadingVisual={leadingVisual}
      trailingVisual={trailingVisual}
      variant={variant}
    >
      <BaseInput {...props} />
    </InputWrapper>
  );
};

export default TextInput;
