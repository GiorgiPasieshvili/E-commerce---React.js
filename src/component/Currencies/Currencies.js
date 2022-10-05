import { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_CURRENCIES } from "query/currencies.query";

import "./Currencies.scss";

class Currencies extends PureComponent {
  _formatCurrency(currency) {
    return currency === "AUD" ? "usd" : currency.toLowerCase();
  }

  render() {
    const {
      currency,
      setCurrency,
      currencyActive,
      setCurrencyActive,
      setMinicartActive,
    } = this.props;

    const { _formatCurrency } = this;

    return (
      <Query query={GET_CURRENCIES}>
        {({ loading, error, data }) => {
          if (loading) return <div className="preloader"></div>;
          if (error) console.log(error);

          return (
            <div className="currencies">
              <span
                onClick={() => {
                  setMinicartActive(false);
                  setCurrencyActive(!currencyActive);
                }}
              >
                <i className={"fa fa-" + _formatCurrency(currency)}></i>
              </span>

              <ul className={currencyActive ? "active" : null}>
                {data.currencies.map((currency, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setCurrency(currency);
                      setCurrencyActive(false);
                    }}
                  >
                    <i className={"fa fa-" + _formatCurrency(currency)}></i>
                    {currency}
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Currencies;