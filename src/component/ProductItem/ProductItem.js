import { PureComponent } from "react";
import { Link } from "react-router-dom";

/* Custom Utils */
import getCurrencyIcon from "util/getCurrencyIcon";
import getProductAmount from "util/getProductAmount";

/* Graphql Stuff */
import { connect } from "react-redux";
import { addProduct } from "store/cartProductsSlice";

import "./ProductItem.scss";

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.current,
  cartProducts: state.cartProducts.cartProducts,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (payload) => dispatch(addProduct(payload)),
});

class ProductItem extends PureComponent {
  render() {
    const { currentCurrency, cartProducts, addProduct, product } = this.props;

    return (
      <li className="product-item">
        {/* Go to product page by clicking image */}
        <Link className="product-item__link" to={"/product/" + product.id}>
          {/* Render message if product is out of stock */}
          {!product.inStock && (
            <span className="product-item__stock">out of stock</span>
          )}

          {/* Render icon for products which are in cart */}
          {cartProducts.find((item) => item.id === product.id) && (
            <img
              className="product-item__icon"
              src="/images/greencart.svg"
              alt="incart"
            />
          )}

          {/* Product Image */}
          <img
            className="product-item__image"
            src={product.gallery[0]}
            alt={product.name}
          />
        </Link>

        {/* Product Title */}
        <h2 className="product-item__title">
          {product.brand} {product.name}
        </h2>

        {/* Product bottom area which acts like row */}
        <div className="product-item__row">
          {/* Render price */}
          <span className="product-item__price">
            {getCurrencyIcon(currentCurrency)}

            {/* Find correct price by chosen currency */}
            {getProductAmount(product, currentCurrency)}
          </span>

          {/* Render button if product is in stock */}
          {product.inStock && (
            <button
              className="product-item__button button button--green"
              onClick={() => {
                addProduct({ product });
              }}
            >
              add to cart
            </button>
          )}
        </div>
      </li>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
