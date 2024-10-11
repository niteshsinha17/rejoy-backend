export interface IState {
  step: STEPS;
  loading: boolean;
  password: string;
  passwordError: string;
}

export enum STEPS {
  ENTER_EMAIL = 1,
  ENTER_OTP = 2,
}
