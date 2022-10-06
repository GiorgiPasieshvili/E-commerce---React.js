import { PureComponent } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { clearCategory } from "store/categorySlice";

const mapDispatchToProps = (dispatch) => ({
  clearCategory: () => dispatch(clearCategory()),
});

class Logo extends PureComponent {
  render() {
    const { clearCategory } = this.props;

    return (
      <div className="logo">
        <Link to="/" onClick={() => clearCategory()}>
          <img src="/images/logo.png" alt="mincommerce" />
        </Link>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Logo);
