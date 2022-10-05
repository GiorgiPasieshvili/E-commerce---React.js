function getCurrencyIcon(currency) {
  return currency === "AUD" ? (
    <i className="fa fa-usd"></i>
  ) : (
    <i className={"fa fa-" + currency.toLowerCase()}></i>
  );
}

export default getCurrencyIcon;
