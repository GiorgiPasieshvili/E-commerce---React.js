import { PureComponent } from "react";
import { Link } from "react-router-dom";

import "./MiniCart.scss";

class MiniCart extends PureComponent {
  _formatCurrency(currency) {
    return currency === "AUD" ? "usd" : currency.toLowerCase();
  }

  render() {
    const {
      cartItems,
      currency,
      minicartActive,
      setMinicartActive,
      setCurrencyActive,
      onAdd,
      onRemove,
      onChange,
    } = this.props;

    const { _formatCurrency } = this;

    const itemsPrice = cartItems.reduce(
      (a, c) =>
        a +
        c.prices.find((price) => price.currency === currency).amount * c.qty,
      0
    );

    const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);

    return (
      <div className="minicart-wrapper">
        <div
          className="cart-icon"
          onClick={() => {
            setMinicartActive(!minicartActive);
            setCurrencyActive(false);
          }}
        >
          {totalItems > 0 && <span className="indicator">{totalItems}</span>}

          <img src="/images/minicart.svg" alt="minicart" />
        </div>

        <div className={"minicart" + (minicartActive ? " active" : "")}>
          <h4>
            My Bag, <span>{cartItems.length} items</span>
          </h4>

          <ul className="list">
            {cartItems
              .slice(cartItems.length - 2, cartItems.length)
              .reverse()
              .map((product) => (
                <li key={product.uniqueId}>
                  <div className="left">
                    <h3>{product.brand}</h3>
                    <h2>{product.name}</h2>
                    <span className="price">
                      <i className={"fa fa-" + _formatCurrency(currency)}></i>
                      {
                        product.prices.find(
                          (price) => price.currency === currency
                        ).amount
                      }
                    </span>

                    {product.attributes.map((attribute) => (
                      <div className="attribute" key={attribute.id}>
                        <span className="heading">{attribute.name}:</span>
                        <ul className="options">
                          {attribute.items.map((item) => {
                            const selectedItem = product.selectedOptions.find(
                              (option) =>
                                option.id === attribute.id &&
                                option.value === item.value
                            );
                            return attribute.type === "swatch" ? (
                              <li
                                style={{
                                  background: item.value,
                                  width: "20px",
                                }}
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
                                className={selectedItem ? "active" : undefined}
                                onClick={() =>
                                  onChange(product, attribute.id, item.value)
                                }
                                key={item.id}
                              >
                                {item.value}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
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
              ))}
          </ul>

          <div className="total">
            <span>Total</span>
            <span>
              <i
                className={`fa fa-${
                  currency === "AUD" ? "usd" : currency.toLowerCase()
                }`}
              ></i>
              {itemsPrice.toFixed(2)}
            </span>
          </div>

          <div className="buttons">
            <Link
              to={`/cart`}
              className="button button--light"
              onClick={() => setMinicartActive(false)}
            >
              view bag
            </Link>

            <button className="button button--green">check out</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniCart;