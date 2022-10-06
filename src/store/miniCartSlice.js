import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
};

export const miniCartSlice = createSlice({
  name: "miniCart",
  initialState,
  reducers: {
    miniCartToggle: (state) => {
      state.isActive = !state.isActive;
    },
    miniCartDisable: (state) => {
      state.isActive = false;
    },
  },
});

export const { miniCartToggle, miniCartDisable } = miniCartSlice.actions;

export default miniCartSlice.reducer;
