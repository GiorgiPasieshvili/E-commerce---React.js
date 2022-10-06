export const getProductsFromLocalStorage = () => {
  if (localStorage.getItem("cartProducts")) {
    return JSON.parse(localStorage.getItem("cartProducts"));
  }

  return [];
};

export const setProductsToLocalStorage = (cartProducts) => {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
};
