import { IAppState } from "@/models";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IAppState = {
  isSidebarOpen: true,
  isChatSidebarOpen: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleChatSidebar(state) {
      state.isChatSidebarOpen = !state.isChatSidebarOpen;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const { toggleSidebar, toggleChatSidebar } = appSlice.actions;
export const appActions = appSlice.actions;

export default appSlice.reducer;
