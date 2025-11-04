import { createSlice } from "@reduxjs/toolkit";

interface EditTaskModalState {
  isModalOpen: boolean;
}

const initialState: EditTaskModalState = {
  isModalOpen: false,
};

const editTaskModalSlice = createSlice({
  name: "editTaskModal",
  initialState,
  reducers: {
    toggleEditTaskModalOpen: (state) => {
      state.isModalOpen = true;
    },
    toggleEditTaskModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleEditTaskModalOpen, toggleEditTaskModalClose } =
  editTaskModalSlice.actions;
export default editTaskModalSlice.reducer;
