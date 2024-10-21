import { BaseInput, IInputProps, InputWrapper } from "../base";

export interface ITextInputProps extends IInputProps {}

const NumberInput = ({ error, leadingVisual, trailingVisual, ...props }: ITextInputProps) => {
  return (
    <InputWrapper
      error={error}
      leadingVisual={leadingVisual}
      trailingVisual={trailingVisual}
    >
      <BaseInput
        {...props}
        validateRegex={/^\d*$/}
      />
    </InputWrapper>
  );
};

export default NumberInput;
