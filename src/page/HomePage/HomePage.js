import { PureComponent } from "react";
import Products from "component/Products";

class HomePage extends PureComponent {
  render() {
    return <Products {...this.props} />;
  }
}

export default HomePage;
