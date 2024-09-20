import { CheckCircleOutlineIcon, XCircleOutlineIcon } from "@/icons";

interface IPasswordCheckProps {
  password: string;
}

const PasswordCheck = (props: IPasswordCheckProps) => {
  const password = props.password;
  const check1 = password.length >= 8;
  const check2 = /[A-Z]/.test(password);
  const check3 = /[a-z]/.test(password);
  const check4 = /[0-9]/.test(password);

  return (
    <ul className="flex flex-col gap-1 text-sm font-medium">
      <li className="flex items-center gap-1">
        {check1 ? (
          <CheckCircleOutlineIcon className="text-success icon-md" />
        ) : (
          <XCircleOutlineIcon className="text-danger icon-md" />
        )}
        8 characters minimum
      </li>
      <li className="flex items-center gap-1">
        {check2 ? (
          <CheckCircleOutlineIcon className="text-success icon-md" />
        ) : (
          <XCircleOutlineIcon className="text-danger icon-md" />
        )}
        At least one uppercase letter
      </li>
      <li className="flex items-center gap-1">
        {check3 ? (
          <CheckCircleOutlineIcon className="text-success icon-md" />
        ) : (
          <XCircleOutlineIcon className="text-danger icon-md" />
        )}
        At least one lowercase letter
      </li>
      <li className="flex items-center gap-1">
        {check4 ? (
          <CheckCircleOutlineIcon className="text-success icon-md" />
        ) : (
          <XCircleOutlineIcon className="text-danger icon-md" />
        )}
        At least one number
      </li>
    </ul>
  );
};

export default PasswordCheck;
