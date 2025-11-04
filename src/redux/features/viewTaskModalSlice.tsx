import { createSlice } from "@reduxjs/toolkit";

interface ViewTaskModalState {
  isModalOpen: boolean;
}

const initialState: ViewTaskModalState = {
  isModalOpen: false,
};

const viewTaskModalSlice = createSlice({
  name: "viewTaskModal",
  initialState,
  reducers: {
    toggleViewTaskModalOpen: (state) => {
      state.isModalOpen = true;
    },
    toggleViewTaskModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleViewTaskModalOpen, toggleViewTaskModalClose } =
  viewTaskModalSlice.actions;
export default viewTaskModalSlice.reducer;
