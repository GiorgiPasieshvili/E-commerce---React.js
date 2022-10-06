function getCurrencyAmount(product, currency) {
  return product.prices.find((price) => price.currency === currency).amount;
}

export default getCurrencyAmount;
