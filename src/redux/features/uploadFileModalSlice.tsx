import { createSlice } from "@reduxjs/toolkit";

interface UploadFileModalState {
  isModalOpen: boolean;
}

const initialState: UploadFileModalState = {
  isModalOpen: false,
};

const uploadFileModalSlice = createSlice({
  name: "uploadFileModal",
  initialState,
  reducers: {
    toggleUploadFileModalOpen: (state) => {
      state.isModalOpen = true;
    },
    toggleUploadFileModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleUploadFileModalOpen, toggleUploadFileModalClose } =
  uploadFileModalSlice.actions;
export default uploadFileModalSlice.reducer;
