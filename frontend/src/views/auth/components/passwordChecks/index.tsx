import { CheckCircleOutlineIcon, XCircleOutlineIcon } from "@/icons";
import { PASSWORD_MIN_LENGTH } from "@/utils";

interface IPasswordCheckProps {
  password: string;
}

const PasswordCheck = (props: IPasswordCheckProps) => {
  const password = props.password;
  const meetsMinLength = password.length >= PASSWORD_MIN_LENGTH;

  return (
    <ul className="flex flex-col gap-1 text-sm font-medium">
      <li className="flex items-center gap-1">
        {meetsMinLength ? (
          <CheckCircleOutlineIcon className="text-success icon-sm" />
        ) : (
          <XCircleOutlineIcon className="text-danger icon-sm" />
        )}
        At least {PASSWORD_MIN_LENGTH} characters
      </li>
    </ul>
  );
};

export default PasswordCheck;
