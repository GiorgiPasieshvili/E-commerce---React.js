function calcTotalPrice(products) {
  return products
    .reduce(
      (total, item) =>
        total +
        item.prices.find((price) => price.currency === currency).amount *
          item.qty,
      0
    )
    .toFixed(2);
}

export default calcTotalPrice;
