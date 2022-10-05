/* Import components and utils */
import { PureComponent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

/* Import custom utils */
import getCurrencyIcon from "util/getCurrencyIcon";
import getTotalPrice from "util/getTotalPrice";

import "./CartPage.scss";

class CartPage extends PureComponent {
  render() {
    const { currency, cartItems, onAdd, onRemove, onChange } = this.props;

    const totalPrice = getTotalPrice(cartItems);

    return (
      <div className="cart">
        <div className="container">
          <h2 className="cart__heading">cart</h2>
          <ul className="cart__list">
            {cartItems
              .slice(0)
              .reverse()
              .map((product) => (
                <li key={product.uniqueId} className="cart__item">
                  <div>
                    <h4>{product.brand}</h4>
                    <h3>{product.name}</h3>
                    <span className="price">
                      {getCurrencyIcon(currency)}
                      {
                        product.prices.find(
                          (price) => price.currency === currency
                        ).amount
                      }
                    </span>

                    <div className="attributes">
                      {product.attributes.map((attribute) => (
                        <ul className="options" key={attribute.id}>
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
                                  selectedItem ? "swatch-active" : undefined
                                }
                                key={item.id}
                              ></li>
                            ) : (
                              <li
                                onClick={() =>
                                  onChange(product, attribute.id, item.value)
                                }
                                className={selectedItem ? "active" : undefined}
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

                  <div className="right">
                    <div className="quantity">
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
                        <div key={index}>
                          <img src={image} alt={product.name} />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </li>
              ))}
          </ul>

          <div className="checkout">
            <div>
              <span>Total:</span>
              <span>
                {getCurrencyIcon(currency)}
                {totalPrice}
              </span>
            </div>

            <button className="button button--green">check out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
