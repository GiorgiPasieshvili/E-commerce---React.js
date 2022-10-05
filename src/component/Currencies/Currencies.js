import { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_CURRENCIES } from "query/currencies.query";
import getCurrencyIcon from "util/getCurrencyIcon";

import "./Currencies.scss";

class Currencies extends PureComponent {
  render() {
    const {
      currency,
      setCurrency,
      currencyActive,
      setCurrencyActive,
      setMinicartActive,
    } = this.props;

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
                {getCurrencyIcon(currency)}
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
                    {getCurrencyIcon(currency)}
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
