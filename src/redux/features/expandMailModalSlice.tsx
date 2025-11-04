import { createSlice } from "@reduxjs/toolkit";

interface ExpandMailModalState {
  isModalOpen: boolean;
}

const initialState: ExpandMailModalState = {
  isModalOpen: false,
};

const expandMailModalSlice = createSlice({
  name: "expandMailModal",
  initialState,
  reducers: {
    toggleExpandMailModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    toggleExpandMailModalClose: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { toggleExpandMailModal, toggleExpandMailModalClose } =
  expandMailModalSlice.actions;
export default expandMailModalSlice.reducer;
