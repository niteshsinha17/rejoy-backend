import { ILoggedInUserProfile, IUserState } from "@/models";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IUserState = {
  isUserDataLoading: true,
  userData: undefined,
  isProfileDataLoading: true,
  profileData: undefined,
  guestUsername: "Guest User",
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    resetProfileData: (state) => {
      state.profileData = undefined;
      state.isProfileDataLoading = false;
    },
    updateProfileData: (state, action: PayloadAction<ILoggedInUserProfile>) => {
      state.profileData = action.payload;
    },
    changeEmail: (state, action: PayloadAction<string>) => {
      if (state.userData) {
        state.userData.email = action.payload;
        state.userData.emailVerified = false;
      }
    },
    verifyEmail: (state) => {
      if (state.userData) {
        state.userData.emailVerified = true;
      }
    },
    addGuestUsername: (state, action: PayloadAction<string>) => {
      state.guestUsername = action.payload;
    },
    removeGuestUsername: (state) => {
      state.guestUsername = "";
    },
    reset: () => {
      return initialState;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
