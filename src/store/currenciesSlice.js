import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    currenciesToggle: (state) => {
      state.isActive = !state.isActive;
    },
    currenciesDisable: (state) => {
      state.isActive = false;
    },
  },
});

export const { currenciesToggle, currenciesDisable } = currenciesSlice.actions;

export default currenciesSlice.reducer;
