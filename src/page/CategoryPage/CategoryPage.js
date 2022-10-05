import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import ProductGrid from "component/ProductGrid";

class CategoryPage extends PureComponent {
  render() {
    const { name } = this.props.match.params;

    return <ProductGrid {...this.props} category={name} />;
  }
}

export default withRouter(CategoryPage);
