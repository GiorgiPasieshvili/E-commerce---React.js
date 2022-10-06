import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Interweave from "interweave";

/* Redux Stuff */
import { connect } from "react-redux";
import { addProduct } from "store/cartProductsSlice";

/* Import Graphql Stuff */
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCT } from "query/product.query";

/* Import Custom Utils */
import getCurrencyIcon from "util/getCurrencyIcon";
import getCurrencyAmount from "util/getCurrencyAmount";

import "./ProductPage.scss";

const mapStateToProps = (state) => ({
  currentCurrency: state.currency.current,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (payload) => dispatch(addProduct(payload)),
});

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeImage: "",
      selectedOptions: [],
    };
  }

  handleOptions = (id, value) => {
    const exist = this.state.selectedOptions.find((option) => option.id === id);
    if (exist) {
      this.setState((state) => ({
        ...state,
        selectedOptions: this.state.selectedOptions.map((x) =>
          x.id === id ? { ...exist, value } : x
        ),
      }));
    } else {
      this.setState((state) => ({
        ...state,
        selectedOptions: [...this.state.selectedOptions, { id, value }],
      }));
    }
  };

  handleImage = (image) => {
    this.setState((state) => ({
      ...state,
      activeImage: image,
    }));
  };

  addToCart = (product) => {
    const { addProduct } = this.props;

    const payload = {
      product: product,
      options: this.state.selectedOptions,
    };

    addProduct(payload);
    this.setState((state) => ({
      ...state,
      selectedOptions: [],
    }));
  };

  render() {
    const id = this.props.match.params.id || "";
    const { currentCurrency } = this.props;

    return (
      <Query query={GET_PRODUCT} variables={{ name: id }}>
        {({ loading, error, data }) => {
          if (loading) return <div className="preloader"></div>;
          if (error) console.log(error);
          const { product } = data;

          return (
            <div className="product">
              <div className="product__row | container">
                {/* Product Slider */}
                <div className="product__slider">
                  <div className="product__thumbs">
                    {product.gallery.map((image, index) => (
                      <img
                        onClick={() => this.handleImage(image)}
                        src={image}
                        alt={product.name}
                        key={index}
                      />
                    ))}
                  </div>
                  <img
                    className="product__image"
                    src={this.state.activeImage || product.gallery[0]}
                    alt={product.name}
                  />
                </div>

                {/* Product Details */}
                <div className="product__details">
                  <h3 className="product__subtitle">{product.brand}</h3>
                  <h2 className="product__title">{product.name}</h2>

                  {/* Map All Attributes */}
                  {product.attributes.map((attribute) => (
                    <div className="product__attribute" key={attribute.id}>
                      <span className="product__label">{attribute.name}:</span>
                      <ul className="product__options options">
                        {attribute.items.map((item) => {
                          const selectedItem = this.state.selectedOptions.find(
                            (option) =>
                              option.id === attribute.id &&
                              option.value === item.value
                          );

                          return attribute.type === "swatch" ? (
                            <li
                              style={{ background: item.value }}
                              className={selectedItem ? "active-swatch" : ""}
                              onClick={() =>
                                this.handleOptions(attribute.id, item.value)
                              }
                              key={item.id}
                            ></li>
                          ) : (
                            <li
                              className={selectedItem ? "active" : ""}
                              onClick={() =>
                                this.handleOptions(attribute.id, item.value)
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

                  {/* Product Price Attribute */}
                  <div className="product__attribute">
                    <span className="product__label">price:</span>
                    <span className="product__price">
                      {getCurrencyIcon(currentCurrency)}
                      {getCurrencyAmount(product, currentCurrency)}
                    </span>
                  </div>

                  {/* Product Main Button */}
                  {product.inStock ? (
                    <button
                      className="product__button button button--green"
                      onClick={() => this.addToCart(product)}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <button className="product__button button button--red">
                      OUT OF STOCK
                    </button>
                  )}

                  <Interweave
                    className="product__description"
                    content={product.description}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductPage));
