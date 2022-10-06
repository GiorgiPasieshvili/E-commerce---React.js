import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: "USD",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { changeCurrency } = currencySlice.actions;

export default currencySlice.reducer;
