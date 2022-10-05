import { PureComponent } from "react";
import ProductGrid from "component/ProductGrid";

class HomePage extends PureComponent {
  render() {
    return <ProductGrid {...this.props} />;
  }
}

export default HomePage;
