import { PureComponent } from "react";
import { Query } from "@apollo/client/react/components";
import { GET_PRODUCTS } from "query/products.query";

import ProductItem from "component/ProductItem";
import "./ProductGrid.scss";

class ProductGrid extends PureComponent {
  render() {
    const category = this.props.category || "";

    return (
      <Query query={GET_PRODUCTS} variables={{ name: category }}>
        {({ loading, error, data }) => {
          if (loading) return <div className="preloader"></div>;
          if (error) console.log(error);

          const { products } = data.category;

          return (
            <div className="product-grid">
              <div className="container">
                {category && (
                  <h3 className="product-grid__heading">{category}</h3>
                )}

                <ul className="product-grid__list">
                  {products.map((product, index) => {
                    return (
                      <ProductItem
                        key={index}
                        product={product}
                        {...this.props}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ProductGrid;
