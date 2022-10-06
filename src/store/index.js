import { configureStore } from "@reduxjs/toolkit";
import miniCartSlice from "./miniCartSlice";
import currenciesSlice from "./currenciesSlice";
import currencySlice from "./currencySlice";
import categorySlice from "./categorySlice";
import cartProductsSlice from "./cartProductsSlice";

export const store = configureStore({
  reducer: {
    miniCart: miniCartSlice,
    currencies: currenciesSlice,
    currency: currencySlice,
    category: categorySlice,
    cartProducts: cartProductsSlice,
  },
});
