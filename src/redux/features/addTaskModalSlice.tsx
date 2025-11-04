import { createSlice } from "@reduxjs/toolkit";

interface AddTaskModalState {
  isModalOpen: boolean;
}

const initialState: AddTaskModalState = {
  isModalOpen: false,
};

const addTaskModalSlice = createSlice({
  name: "addTaskModal",
  initialState,
  reducers: {
    toggleAddTaskModalOpen: (state) => {
      state.isModalOpen = true;
    },
    toggleAddTaskModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleAddTaskModalOpen, toggleAddTaskModalClose } =
  addTaskModalSlice.actions;
export default addTaskModalSlice.reducer;
