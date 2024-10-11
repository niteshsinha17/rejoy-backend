import { useAuth } from "@/hooks";
import useTimer from "@/hooks/useTimer";
import { IErrorResponse } from "@/models/common";
import { authApi } from "@/services/auth.service";
import { Button } from "@/ui";
import { NumberInput } from "@/ui/inputs";
import Modal from "@/ui/modal";
import { Toast } from "@/utils";
import React, { useState } from "react";

interface IEnterOptViewProps {
  onClose: () => void;
  resendOtp: () => void;
  email: string;
}

const EnterOptModal = (props: IEnterOptViewProps) => {
  const [otp, setOtp] = useState<string>("");
  const { registerSuccess } = useAuth();
  const { timeLeft, formattedTime, restart } = useTimer({
    timeInSecond: 60,
    autoStart: true,
  });
  const [activateUser, activateUserState] = authApi.useActivateUserMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) return;
    activateUser({ email: props.email, otp })
      .unwrap()
      .then((response) => {
        registerSuccess(response.token);
      })
      .catch((response: IErrorResponse<undefined>) => {
        Toast.error(response.message);
      });
  };

  return (
    <Modal open>
      <Modal.Header>
        <Modal.HeaderTitle>Enter Verification Code</Modal.HeaderTitle>
        <Modal.HeaderCloseButton onClick={props.onClose} />
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <div className="text-sm">
            Enter the Verification Code sent to your email address <br />
            <b>{props.email}</b>
          </div>
          <NumberInput
            name="otp"
            value={otp}
            setValue={(_, value) => setOtp(value)}
            type="text"
            maxLength={4}
            placeholder="Enter Verification Code"
            autoFocus
          />
          {timeLeft > 0 ? (
            <div className="text-sm">
              Resend in <span className="font-medium text-primary">{formattedTime}</span>
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
          <Button
            loading={activateUserState.isLoading}
            type="submit"
            disabled={otp.length < 4 || activateUserState.isSuccess}
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EnterOptModal;
