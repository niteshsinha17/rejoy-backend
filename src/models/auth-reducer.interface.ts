// state
export interface IAuthState {
  initialized: boolean;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  authCheckDone: boolean;
}

// payloads

export interface ICheckAuthPayload {
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginPayload {
  token: string;
}
