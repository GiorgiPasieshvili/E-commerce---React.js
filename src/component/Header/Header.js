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
      cartItems,
      setCartItems,
      onAdd,
      onRemove,
      onChange,
    } = this.props;

    return (
      <div className="header">
        <div className="header__row | container">
          <Menu category={category} setCategory={setCategory} />
          <Logo setCategory={setCategory} />

          <div className="header__features">
            <Currencies
              currency={currency}
              setCurrency={setCurrency}
            />

            <MiniCart
              currency={currency}
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
