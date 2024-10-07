export interface IAuthState {
  initialized: boolean;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
