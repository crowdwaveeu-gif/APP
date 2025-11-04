import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarBgState {
  sidebarBg: string;
}

const initialState: SidebarBgState = {
  sidebarBg: "",
};

const sidebarBgSlice = createSlice({
  name: "sidebarBg",
  initialState,
  reducers: {
    toggleSidebarBg: (state, action: PayloadAction<string>) => {
      state.sidebarBg = action.payload;
    },
  },
});

export const { toggleSidebarBg } = sidebarBgSlice.actions;
export default sidebarBgSlice.reducer;
