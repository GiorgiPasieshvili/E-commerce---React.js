import { configureStore } from "@reduxjs/toolkit";
import miniCartSlice from "./miniCartSlice";
import currenciesSlice from "./currenciesSlice";

export const store = configureStore({
  reducer: {
    miniCart: miniCartSlice,
    currencies: currenciesSlice,
  },
});
