/* Import components and utils */
import { PureComponent } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

/* Redux Stuff */
import { connect } from "react-redux";
import {
  addProduct,
  removeProduct,
  changeProduct,
} from "store/cartProductsSlice";

/* Import custom utils */
import getCurrencyIcon from "util/getCurrencyIcon";
import getTotalPrice from "util/getTotalPrice";
import getProductAmount from "util/getProductAmount";

import "./CartPage.scss";

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.current,
  cartProducts: state.cartProducts.cartProducts,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (payload) => dispatch(addProduct(payload)),
  removeProduct: (payload) => dispatch(removeProduct(payload)),
  changeProduct: (payload) => dispatch(changeProduct(payload)),
});

class CartPage extends PureComponent {
  render() {
    const {
      currentCurrency,
      cartProducts,
      addProduct,
      removeProduct,
      changeProduct,
    } = this.props;

    const totalPrice = getTotalPrice(cartProducts, currentCurrency);

    return (
      <div className="cart">
        <div className="container">
          <h2 className="cart__heading">cart</h2>

          {/* List of Products */}
          <ul className="cart__list">
            {cartProducts
              .slice(0)
              .reverse()
              .map((product) => (
                <li key={product.uniqueId} className="cart__item">
                  <div className="cart__details">
                    <h4 className="cart__subtitle">{product.brand}</h4>
                    <h3 className="cart__title">{product.name}</h3>
                    <span className="cart__price">
                      {getCurrencyIcon(currentCurrency)}
                      {getProductAmount(product, currentCurrency)}
                    </span>

                    {/* Product Attributes */}
                    <div className="cart__attributes">
                      {product.attributes.map((attribute) => (
                        <ul
                          className="cart__options options"
                          key={attribute.id}
                        >
                          {attribute.items.map((item) => {
                            const selectedItem = product.options.find(
                              (option) =>
                                option.id === attribute.id &&
                                option.value === item.value
                            );

                            return attribute.type === "swatch" ? (
                              <li
                                style={{ background: item.value }}
                                onClick={() =>
                                  changeProduct({
                                    product: product,
                                    id: attribute.id,
                                    value: item.value,
                                  })
                                }
                                className={
                                  selectedItem ? "active-swatch" : null
                                }
                                key={item.id}
                              ></li>
                            ) : (
                              <li
                                onClick={() =>
                                  changeProduct({
                                    product: product,
                                    id: attribute.id,
                                    value: item.value,
                                  })
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
                      <button onClick={() => addProduct({ product })}>+</button>
                      <span>{product.qty}</span>
                      <button onClick={() => removeProduct({ product })}>
                        -
                      </button>
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
              Total: {getCurrencyIcon(currentCurrency)}
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
