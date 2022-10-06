import { createSlice } from "@reduxjs/toolkit";
import {
  getProductsFromLocalStorage,
  setProductsToLocalStorage,
} from "util/localStorage";

const initialState = {
  cartProducts: getProductsFromLocalStorage(),
};

export const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      let { product, options } = action.payload;

      if (!options) {
        options = product.options ? product.options : [];
      }

      const sameProduct = state.cartProducts
        .filter((x) => x.id === product.id)
        .find((x) => JSON.stringify(x.options) === JSON.stringify(options));

      if (sameProduct) {
        state.cartProducts = state.cartProducts.map((x) =>
          x.uniqueId === sameProduct.uniqueId
            ? { ...sameProduct, qty: sameProduct.qty + 1 }
            : x
        );
      } else {
        state.cartProducts = [
          ...state.cartProducts,
          {
            ...product,
            uniqueId: state.cartProducts[0]
              ? state.cartProducts[state.cartProducts.length - 1].uniqueId + 1
              : 0,
            qty: 1,
            options,
          },
        ];
      }

      setProductsToLocalStorage(state.cartProducts);
    },

    removeProduct: (state, action) => {
      let { product } = action.payload;

      const existedProduct = state.cartProducts.find(
        (x) => x.uniqueId === product.uniqueId
      );

      if (existedProduct.qty === 1) {
        state.cartProducts = state.cartProducts.filter(
          (x) => x.uniqueId !== product.uniqueId
        );
      } else {
        state.cartProducts = state.cartProducts.map((x) =>
          x.uniqueId === product.uniqueId
            ? { ...existedProduct, qty: existedProduct.qty - 1 }
            : x
        );
      }

      setProductsToLocalStorage(state.cartProducts);
    },

    changeProduct: (state, action) => {
      let { product, attributeId, value } = action.payload;

      state.cartProducts = state.cartProducts.map((x) =>
        x.uniqueId === product.uniqueId
          ? {
              ...product,
              options: [
                ...product.options.filter(
                  (option) => option.attributeId !== attributeId
                ),
                { attributeId, value },
              ],
            }
          : x
      );

      setProductsToLocalStorage(state.cartProducts);
    },
  },
});

export const { addProduct, removeProduct, changeProduct } =
  cartProductsSlice.actions;

export default cartProductsSlice.reducer;
