import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Products from "component/Products";

class CategoryPage extends PureComponent {
  render() {
    const { name } = this.props.match.params;

    return <Products {...this.props} category={name} />;
  }
}

export default withRouter(CategoryPage);
