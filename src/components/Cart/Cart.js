import { Component } from 'react';
import './Cart.css'

export default class Cart extends Component {

  render() {
    const { currency, cartItems, onAdd, onRemove, onChange } = this.props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.prices.find(price => price.currency === currency).amount * c.qty, 0);

    return (
      <div className="cart container">
        <h2>cart</h2>
        <ul>
          { cartItems
            .slice(0)
            .reverse()
            .map((product) => (
              <li key={product.id} >
                <div>
                  <h4>{product.brand}</h4>
                  <h3>{product.name}</h3>
                  <span className="price">{product.prices.find(price => price.currency === currency).amount} {currency}</span>
                  
                  <div className="attributes">
                    { product.attributes.map((attribute) => (
                        <ul className="options" key={attribute.id} >

                          { attribute.items.map((item) => {
                              const selectedItem = product.selectedOptions.find(option => option.id === attribute.id && option.value === item.value)
                              return (
                                attribute.type === "swatch" ? (
                                  <li 
                                    style={{background: item.value}} 
                                    onClick={() => onChange(product, attribute.id, item.value)} 
                                    className={selectedItem ? 'swatch-active' : undefined}
                                    key={item.id}
                                  ></li>
                                ) : (
                                  <li 
                                    onClick={() => onChange(product, attribute.id, item.value)} 
                                    className={selectedItem ? 'active' : undefined}
                                    key={item.id}
                                  > 
                                  {item.value}
                                  </li>
                                )
                            )}) }

                        </ul>
                      )) }
                    </div>
                </div>
  
                <div className="right">
                  <div className="quantity">
                    <button onClick={() => onAdd(product)}>+</button>
                    <span>{product.qty}</span>
                    <button onClick={() => onRemove(product)}>-</button>
                  </div>
                  <img src={product.gallery[0]} alt={product.name} />
                </div>
              </li>
            )) }
        </ul>
  
        <div className="checkout">
          <div>
            <span>Total:</span>
            <span>{itemsPrice.toFixed(2)} {currency}</span>
          </div>
  
          <button className="btn btn-green">
            check out
          </button>
        </div>

      </div>
      )
  }
}