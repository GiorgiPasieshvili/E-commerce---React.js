import { PureComponent } from "react";

import Menu from "component/Menu";
import Logo from "component/Logo";
import Currencies from "component/Currencies";
import MiniCart from "component/MiniCart";

import "./Header.scss";

class Header extends PureComponent {
  render() {
    const {
      category,
      setCategory,
      currency,
      setCurrency,
      currencyActive,
      setCurrencyActive,
      minicartActive,
      setMinicartActive,
      cartItems,
      setCartItems,
      onAdd,
      onRemove,
      onChange,
    } = this.props;

    return (
      <div className="header">
        <div className="container">
          <Menu category={category} setCategory={setCategory} />
          <Logo setCategory={setCategory} />

          <div className="features">
            <Currencies
              currency={currency}
              setCurrency={setCurrency}
              currencyActive={currencyActive}
              setCurrencyActive={setCurrencyActive}
              setMinicartActive={setMinicartActive}
            />

            <MiniCart
              currency={currency}
              minicartActive={minicartActive}
              setMinicartActive={setMinicartActive}
              setCurrencyActive={setCurrencyActive}
              cartItems={cartItems}
              setCartItems={setCartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
