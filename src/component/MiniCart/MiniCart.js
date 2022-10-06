import { PureComponent } from "react";
import { Link } from "react-router-dom";

/* Redux Stuff */
import { connect } from "react-redux";
import { miniCartToggle, miniCartDisable } from "store/miniCartSlice";
import { currenciesDisable } from "store/currenciesSlice";
import {
  addProduct,
  removeProduct,
  changeProduct,
} from "store/cartProductsSlice";

/* Import Custom Utils */
import getCurrencyIcon from "util/getCurrencyIcon";
import getCurrencyAmount from "util/getCurrencyAmount";
import getTotalPrice from "util/getTotalPrice";
import getTotalProducts from "util/getTotalProducts";

import "./MiniCart.scss";

const mapStateToProps = (state) => ({
  isMiniCartActive: state.miniCart.isActive,
  currentCurrency: state.currency.current,
  cartProducts: state.cartProducts.cartProducts,
});

const mapDispatchToProps = (dispatch) => ({
  miniCartToggle: () => dispatch(miniCartToggle()),
  miniCartDisable: () => dispatch(miniCartDisable()),
  currenciesDisable: () => dispatch(currenciesDisable()),
  addProduct: (payload) => dispatch(addProduct(payload)),
  removeProduct: (payload) => dispatch(removeProduct(payload)),
  changeProduct: (payload) => dispatch(changeProduct(payload)),
});

class MiniCart extends PureComponent {
  render() {
    const {
      isMiniCartActive,
      miniCartToggle,
      miniCartDisable,
      currenciesDisable,
      currentCurrency,
      cartProducts,
      addProduct,
      removeProduct,
      changeProduct,
    } = this.props;

    const currencyIcon = getCurrencyIcon(currentCurrency);
    const totalPrice = getTotalPrice(cartProducts, currentCurrency);
    const totalItems = getTotalProducts(cartProducts);

    return (
      <div className="minicart">
        <div
          className="minicart__trigger"
          onClick={() => {
            miniCartToggle();
            currenciesDisable();
          }}
        >
          {totalItems > 0 && (
            <span className="minicart__counter">{totalItems}</span>
          )}

          <img src="/images/minicart.svg" alt="minicart" />
        </div>

        <div
          className={"minicart__wrapper" + (isMiniCartActive ? " active" : "")}
        >
          <h4 className="minicart__heading">
            My Bag, <span>{cartProducts.length} items</span>
          </h4>

          <ul className="minicart__list">
            {cartProducts
              .slice(cartProducts.length - 2, cartProducts.length)
              .reverse()
              .map((product) => (
                <li className="minicart__item" key={product.uniqueId}>
                  {/* Product Details */}
                  <div className="minicart__details">
                    <h3 className="minicart__subtitle">{product.brand}</h3>
                    <h2 className="minicart__title">{product.name}</h2>

                    {/* Product Price */}
                    <span className="minicart__price">
                      {currencyIcon}
                      {getCurrencyAmount(product, currentCurrency)}
                    </span>

                    {/* Render Product Attributes */}
                    {product.attributes.map((attribute) => (
                      <div className="minicart__attribute" key={attribute.id}>
                        <span className="minicart__label">
                          {attribute.name}:
                        </span>
                        <ul className="minicart__options options">
                          {attribute.items.map((item) => {
                            const selectedItem = product.options.find(
                              (option) =>
                                option.id === attribute.id &&
                                option.value === item.value
                            );
                            return attribute.type === "swatch" ? (
                              <li
                                style={{
                                  background: item.value,
                                  width: "1.25rem",
                                }}
                                onClick={() =>
                                  changeProduct({
                                    product,
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
                                className={selectedItem ? "active" : null}
                                onClick={() =>
                                  changeProduct({
                                    product,
                                    id: attribute.id,
                                    value: item.value,
                                  })
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

                  {/* Product image & quantity control */}
                  <div className="minicart__row">
                    <div className="minicart__quantity quantity">
                      <button onClick={() => addProduct({ product })}>+</button>
                      <span>{product.qty}</span>
                      <button onClick={() => removeProduct({ product })}>
                        -
                      </button>
                    </div>
                    <div className="minicart__image">
                      <img src={product.gallery[0]} alt={product.name} />
                    </div>
                  </div>
                </li>
              ))}
          </ul>

          {/* Render Total Price */}
          <div className="minicart__total">
            <span>Total</span>
            <span>
              {currencyIcon}
              {totalPrice}
            </span>
          </div>

          {/* Minicart Buttons */}
          <div className="minicart__buttons">
            <Link
              to="/cart"
              className="minicart__button button button--light"
              onClick={() => miniCartDisable()}
            >
              view bag
            </Link>

            <button className="minicart__button button button--green">
              check out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
