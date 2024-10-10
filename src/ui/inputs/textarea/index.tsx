import { BaseTextArea, IInputProps, InputWrapper } from "../base";

const TextAreaInput = ({ error, leadingVisual, variant, trailingVisual, label, ...props }: IInputProps) => {
  return (
    <InputWrapper
      error={error}
      label={label}
      readOnly={props.readOnly}
      leadingVisual={leadingVisual}
      trailingVisual={trailingVisual}
      variant={variant}
    >
      <BaseTextArea {...props} />
    </InputWrapper>
  );
};

export default TextAreaInput;
