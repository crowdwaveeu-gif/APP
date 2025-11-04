import { createSlice } from "@reduxjs/toolkit";

interface FileDetailModalState {
  isModalOpen: boolean;
}

const initialState: FileDetailModalState = {
  isModalOpen: false,
};

const fileDetailModalSlice = createSlice({
  name: "fileDetailModal",
  initialState,
  reducers: {
    toggleFileDetailModalOpen: (state) => {
      state.isModalOpen = true;
    },
    toggleFileDetailModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleFileDetailModalOpen, toggleFileDetailModalClose } =
  fileDetailModalSlice.actions;
export default fileDetailModalSlice.reducer;
