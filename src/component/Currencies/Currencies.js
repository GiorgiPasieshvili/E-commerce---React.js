import { PureComponent } from "react";
import getCurrencyIcon from "util/getCurrencyIcon";

/* Graphql Stuff */
import { Query } from "@apollo/client/react/components";
import { GET_CURRENCIES } from "query/currencies.query";

/* Redux Stuff */
import { connect } from "react-redux";
import { miniCartDisable } from "store/miniCartSlice";
import { currenciesToggle, currenciesDisable } from "store/currenciesSlice";

import "./Currencies.scss";

const mapStateToProps = (state) => ({
  isCurrenciesActive: state.currencies.isActive,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesToggle: () => dispatch(currenciesToggle()),
  currenciesDisable: () => dispatch(currenciesDisable()),
  miniCartDisable: () => dispatch(miniCartDisable()),
});

class Currencies extends PureComponent {
  render() {
    const { currency, setCurrency } = this.props;

    const {
      isCurrenciesActive,
      currenciesToggle,
      currenciesDisable,
      miniCartDisable,
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
                  miniCartDisable();
                  currenciesToggle();
                }}
              >
                {getCurrencyIcon(currency)}
              </span>

              <ul className={isCurrenciesActive ? "active" : null}>
                {data.currencies.map((currency, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setCurrency(currency);
                      currenciesDisable();
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

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
