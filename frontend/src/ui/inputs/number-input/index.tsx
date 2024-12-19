import { BaseInput, type IInputProps, InputWrapper } from "../base";

export interface ITextInputProps extends IInputProps {}

const NumberInput = ({ error, leadingVisual, trailingVisual, label, variant, ...props }: ITextInputProps) => {
  return (
    <InputWrapper
      error={error}
      readOnly={props.readOnly}
      label={label}
      leadingVisual={leadingVisual}
      trailingVisual={trailingVisual}
      variant={variant}
    >
      <BaseInput
        {...props}
        validateRegex={/^\d*$/}
      />
    </InputWrapper>
  );
};

export default NumberInput;
