import { GenericDialog } from "@/components";
import { useAuth } from "@/hooks";
import useTimer from "@/hooks/useTimer";
import { CloseIcon } from "@/icons";
import { IErrorResponse } from "@/models/common-service.interface";
import { authApi } from "@/services";
import { Button, TextInput } from "@/ui";
import { Toast } from "@/utils";
import { IconButton } from "@mui/material";
import { useState } from "react";

const isNumber = (value: string) => {
  return /^\d+$/.test(value);
};

interface IEnterOptViewProps {
  onClose: () => void;
  resendOtp: () => void;
  username: string;
  email: string;
}

const EnterOptView = (props: IEnterOptViewProps) => {
  const [otp, setOtp] = useState<string>("");
  const { registerSuccess } = useAuth();
  const { timeLeft, formattedTime, start, restart } = useTimer({
    timeInSecond: 60,
    autoStart: true,
  });
  const [activateUser, activateUserState] = authApi.useActivateUserMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    activateUser({ username: props.username, email: props.email, otp })
      .unwrap()
      .then((response) => {
        registerSuccess(response.token);
      })
      .catch((response: IErrorResponse<undefined>) => {
        Toast.error(response.message);
      });
  };

  return (
    <GenericDialog open width="90%" maxWidth="400">
      <div>
        <div className="p-3 px-6 border-b">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Enter Verification Code</div>
            <IconButton onClick={props.onClose}>
              <CloseIcon className="icon-md" />
            </IconButton>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-3 px-6 space-y-3">
          <div className="text-slate-500 text-sm">
            Enter the Verification Code sent to your email address <br />
            <b>{props.email}</b>
          </div>
          <div>
            <TextInput
              name="otp"
              value={otp}
              setValue={(_, value) => setOtp(value)}
              type="text"
              validationFn={isNumber}
              maxLength={4}
              placeholder="Enter Verification Code"
            />
          </div>
          <div className="h-[28px]">
            {timeLeft > 0 ? (
              <div className="text-sm">
                Resend in <b>{formattedTime}</b>
              </div>
            ) : (
              <div className="flex text-sm items-center">
                Didn&apos;t received OTP?{" "}
                <Button
                  onClick={() => {
                    props.resendOtp();
                    restart();
                  }}
                  variant="text"
                  color="primary"
                  size="sm"
                >
                  Resend
                </Button>
              </div>
            )}
          </div>
          <div>
            <Button
              loading={activateUserState.isLoading}
              type="submit"
              disabled={otp.length < 4 || activateUserState.isSuccess}
              fullWidth
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </GenericDialog>
  );
};

export default EnterOptView;
