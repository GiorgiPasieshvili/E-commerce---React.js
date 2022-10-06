function getProductAmount(product, currency) {
  return (
    product.prices.find((price) => price.currency === currency).amount *
    (product.qty || 1)
  ).toFixed(2);
}

export default getProductAmount;
