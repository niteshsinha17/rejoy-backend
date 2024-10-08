import { VisibilityOffSolidIcon, VisibilitySolidIcon } from "@/icons";
import { useState } from "react";
import TextInput, { ITextInputProps } from "../text-input";

const PasswordInput = (props: ITextInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextInput
      {...props}
      placeholder="Password"
      trailingVisual={
        <span
          className="cursor-pointer"
          onClick={toggleShowPassword}
        >
          {showPassword ? <VisibilitySolidIcon className="icon-sm" /> : <VisibilityOffSolidIcon className="icon-sm" />}
        </span>
      }
      type={showPassword ? "text" : "password"}
    />
  );
};

export default PasswordInput;
