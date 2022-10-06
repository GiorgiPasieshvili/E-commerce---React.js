import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.current = action.payload;
    },
    clearCategory: (state) => {
      state.current = "";
    },
  },
});

export const { changeCategory, clearCategory } = categorySlice.actions;

export default categorySlice.reducer;
