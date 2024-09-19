import { BoxLoader } from "@/components";
import { InputLabel } from "@/ui";
import { cn } from "@/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  name: string;
  label?: string;
  value: string;
  isLoading?: boolean;
  showLengthInformation?: boolean;
  error?: string;
  helpText?: string;
  setValue?: (name: string, value: string) => void;
  validationFn?: (value: string) => boolean;
}

const TextInput = ({
  name,
  label,
  value,
  error,
  required,
  className,
  helpText,
  showLengthInformation,
  setValue,
  ...props
}: TextInputProps) => {
  const hasError = error && error.length > 0;

  return (
    <div className={cn("space-y-1", className)}>
      {label && <InputLabel label={label} required={required} htmlFor={name} />}
      {props.isLoading ? (
        <BoxLoader height={42} width="100%" />
      ) : (
        <input
          name={name}
          type="text"
          className={cn(
            "p-2 w-full border rounded-md font-manrope text-base focus:border-primary",
            {
              "border-danger": hasError,
            }
          )}
          value={value}
          onChange={(e) => {
            e.stopPropagation();
            if (props.validationFn && !props.validationFn(e.target.value))
              return;
            if (setValue) setValue(name, e.target.value);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          {...props}
        />
      )}
      <div className="flex justify-between mt-1 pr-1">
        {hasError && <div className="text-xs text-red-400">{error}</div>}
        {!hasError && helpText && (
          <div className="text-xs text-gray-500">{helpText}</div>
        )}

        {showLengthInformation && props.maxLength && (
          <p className="text-xs text-gray-500">
            {value.length}/{props.maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
