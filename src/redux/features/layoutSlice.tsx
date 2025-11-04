import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  isLayout: string;
}

const initialState: LayoutState = {
  isLayout: "style-1",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleLayout: (state, action: PayloadAction<string>) => {
      state.isLayout = action.payload;
    },
  },
});

export const { toggleLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
