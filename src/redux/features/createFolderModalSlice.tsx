import { createSlice } from "@reduxjs/toolkit";

interface CreateFolderModalState {
  isModalOpen: boolean;
}

const initialState: CreateFolderModalState = {
  isModalOpen: false,
};

const createFolderModalSlice = createSlice({
  name: "createFolderModal",
  initialState,
  reducers: {
    toggleCreateFolderModalOpen: (state) => {
      state.isModalOpen = true;
    },
    toggleCreateFolderModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleCreateFolderModalOpen, toggleCreateFolderModalClose } =
  createFolderModalSlice.actions;
export default createFolderModalSlice.reducer;
