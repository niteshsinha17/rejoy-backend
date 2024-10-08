import React from "react";

interface InputLabelProps extends React.HTMLProps<HTMLLabelElement> {
  label: string;
  required?: boolean;
}

const InputLabel = ({ label, required, ...props }: InputLabelProps) => {
  return (
    <label
      className="block text-sm font-medium text-slate-600"
      {...props}
    >
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default InputLabel;
