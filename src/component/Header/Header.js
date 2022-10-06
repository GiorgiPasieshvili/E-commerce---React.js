import { PureComponent } from "react";

import Menu from "component/Menu";
import Logo from "component/Logo";
import Currencies from "component/Currencies";
import MiniCart from "component/MiniCart";

import "./Header.scss";

class Header extends PureComponent {
  render() {
    return (
      <header className="header">
        <div className="header__row | container">
          <Menu />
          <Logo />

          <div className="header__features">
            <Currencies />
            <MiniCart />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
