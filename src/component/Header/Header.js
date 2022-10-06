import { PureComponent } from "react";

import Menu from "component/Menu";
import Logo from "component/Logo";
import Currencies from "component/Currencies";
import MiniCart from "component/MiniCart";

import "./Header.scss";

class Header extends PureComponent {
  render() {
    const { cartItems, setCartItems, onAdd, onRemove, onChange } = this.props;

    return (
      <div className="header">
        <div className="header__row | container">
          <Menu />
          <Logo />

          <div className="header__features">
            <Currencies />

            <MiniCart
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
