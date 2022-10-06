/* Import components and utils */
import { PureComponent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

/* Import custom utils */
import getCurrencyIcon from "util/getCurrencyIcon";
import getTotalPrice from "util/getTotalPrice";
import getCurrencyAmount from "util/getCurrencyAmount";

import "./CartPage.scss";

class CartPage extends PureComponent {
  render() {
    const { currency, cartItems, onAdd, onRemove, onChange } = this.props;

    const totalPrice = getTotalPrice(cartItems, currency);

    return (
      <div className="cart">
        <div className="container">
          <h2 className="cart__heading">cart</h2>

          {/* List of Products */}
          <ul className="cart__list">
            {cartItems
              .slice(0)
              .reverse()
              .map((product) => (
                <li key={product.uniqueId} className="cart__item">
                  <div className="cart__details">
                    <h4 className="cart__subtitle">{product.brand}</h4>
                    <h3 className="cart__title">{product.name}</h3>
                    <span className="cart__price">
                      {getCurrencyIcon(currency)}
                      {getCurrencyAmount(product, currency)}
                    </span>

                    {/* Product Attributes */}
                    <div className="cart__attributes">
                      {product.attributes.map((attribute) => (
                        <ul className="cart__options options" key={attribute.id}>
                          {attribute.items.map((item) => {
                            const selectedItem = product.selectedOptions.find(
                              (option) =>
                                option.id === attribute.id &&
                                option.value === item.value
                            );

                            return attribute.type === "swatch" ? (
                              <li
                                style={{ background: item.value }}
                                onClick={() =>
                                  onChange(product, attribute.id, item.value)
                                }
                                className={
                                  selectedItem ? "active-swatch" : null
                                }
                                key={item.id}
                              ></li>
                            ) : (
                              <li
                                onClick={() =>
                                  onChange(product, attribute.id, item.value)
                                }
                                className={selectedItem ? "active" : null}
                                key={item.id}
                              >
                                {item.value}
                              </li>
                            );
                          })}
                        </ul>
                      ))}
                    </div>
                  </div>

                  <div className="cart__row">
                    <div className="cart__quantity quantity">
                      <button onClick={() => onAdd(product)}>+</button>
                      <span>{product.qty}</span>
                      <button onClick={() => onRemove(product)}>-</button>
                    </div>

                    <Carousel
                      showThumbs={false}
                      showIndicators={false}
                      showStatus={false}
                      width={140}
                    >
                      {product.gallery.map((image, index) => (
                        <div className="cart__image" key={index}>
                          <img src={image} alt={product.name} />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </li>
              ))}
          </ul>

          {/* Cart Checkout Area */}
          <div className="cart__checkout">
            <div className="cart__total-price">
              Total: {getCurrencyIcon(currency)}
              {totalPrice}
            </div>

            <button className="cart__button button button--green">
              check out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
