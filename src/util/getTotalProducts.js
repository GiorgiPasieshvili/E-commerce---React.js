function calcTotalProducts(products) {
  return products.reduce((total, item) => total + item.qty, 0);;
}

export default calcTotalProducts;
