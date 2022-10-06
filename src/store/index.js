import { configureStore } from "@reduxjs/toolkit";
import miniCartSlice from "./miniCartSlice";
import currenciesSlice from "./currenciesSlice";
import currencySlice from "./currencySlice";

export const store = configureStore({
  reducer: {
    miniCart: miniCartSlice,
    currencies: currenciesSlice,
    currency: currencySlice,
  },
});
