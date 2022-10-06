/* Import Utilities */
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* Redux Stuff */
import { connect } from "react-redux";
import { miniCartDisable } from "store/miniCartSlice";
import { currenciesDisable } from "store/currenciesSlice";

/* Import Global Styles */
import "style/main.scss";

/* Import Components & Pages */
import Header from "component/Header";
import HomePage from "page/HomePage";
import CategoryPage from "page/CategoryPage";
import ProductPage from "page/ProductPage";
import CartPage from "page/CartPage";

const mapStateToProps = (state) => ({
  isMiniCartActive: state.miniCart.isActive,
  isCurrenciesActive: state.currencies.isActive,
});

const mapDispatchToProps = (dispatch) => ({
  miniCartDisable: () => dispatch(miniCartDisable()),
  currenciesDisable: () => dispatch(currenciesDisable()),
});

class App extends Component {
  render() {
    const {
      isMiniCartActive,
      isCurrenciesActive,
      miniCartDisable,
      currenciesDisable,
    } = this.props;

    return (
      <div className="app">
        <BrowserRouter>
          <Header />

          <div
            className={
              "overlay" +
              (isMiniCartActive
                ? " active"
                : isCurrenciesActive
                ? " overlay--hidden active"
                : "")
            }
            onClick={() => {
              miniCartDisable();
              currenciesDisable();
            }}
          ></div>

          <Switch>
            <Route exact path="/" children={<HomePage />} />
            <Route exact path="/category/:name" children={<CategoryPage />} />
            <Route exact path="/product/:id" children={<ProductPage />} />
            <Route exact path="/cart" children={<CartPage />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
