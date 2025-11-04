import { createSlice } from "@reduxjs/toolkit";

interface ComposeMailModalState {
  isModalOpen: boolean;
}

const initialState: ComposeMailModalState = {
  isModalOpen: false,
};

const composeMailModalSlice = createSlice({
  name: "composeMailModal",
  initialState,
  reducers: {
    toggleComposeMailModalOpen: (state) => {
      state.isModalOpen = true;
    },
    toggleComposeMailModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleComposeMailModalOpen, toggleComposeMailModalClose } =
  composeMailModalSlice.actions;
export default composeMailModalSlice.reducer;
