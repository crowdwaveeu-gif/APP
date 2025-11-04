import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainBgState {
  mainBg: string;
}

const initialState: MainBgState = {
  mainBg: "",
};

const mainBgSlice = createSlice({
  name: "mainBg",
  initialState,
  reducers: {
    toggleMainBg: (state, action: PayloadAction<string>) => {
      state.mainBg = action.payload;
    },
  },
});

export const { toggleMainBg } = mainBgSlice.actions;
export default mainBgSlice.reducer;
