import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isDark: boolean;
}

const initialState: ThemeState = {
  isDark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkTheme: (state) => {
      state.isDark = true;
      document.body.classList.add("dark-theme");
    },
    toggleLightTheme: (state) => {
      state.isDark = false;
      document.body.classList.remove("dark-theme");
    },
  },
});

export const { toggleDarkTheme, toggleLightTheme } = themeSlice.actions;
export default themeSlice.reducer;
