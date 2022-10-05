import { Component } from 'react';

import Menu from "./Menu/Menu"
import Logo from "./Logo/Logo"
import Currencies from "./Currencies/Currencies"
import MiniCart from "./MiniCart/MiniCart"

import './Header.css'

export default class Header extends Component {
  render(){

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
      onChange } = this.props;

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
    )
  }
}