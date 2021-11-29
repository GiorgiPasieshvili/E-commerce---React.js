import { Component } from 'react';

import Menu from "./Menu/Menu"
import Logo from "./Logo/Logo"
import Currencies from "./Currencies/Currencies"
import MiniCart from "./MiniCart/MiniCart"

import './Header.css'

export default class Header extends Component {
  render(){

    const { category, setCategory, currency, setCurrency, overlay, setOverlay, cartItems, setCartItems, onAdd, onRemove, onChange } = this.props;

    return (
      <div className="header">
        <div className="container">
          <Menu category={category} setCategory={setCategory} />
          <Logo setCategory={setCategory} />
          
          <div className="features">
              <Currencies 
                currency={currency} 
                setCurrency={setCurrency} 
              />

              <MiniCart 
                currency={currency} 
                overlay={overlay} 
                setOverlay={setOverlay} 
                cartItems={cartItems} 
                setCartItems={setCartItems} 
                onAdd={onAdd} 
                onRemove={onRemove} 
                onChange={onChange} 
              />
          </div>

        </div>
      </div>
    )
  }
}