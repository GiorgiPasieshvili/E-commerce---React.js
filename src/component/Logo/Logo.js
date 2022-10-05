import { PureComponent } from "react";
import { Link } from "react-router-dom";

class Logo extends PureComponent {
  render() {
    const { setCategory } = this.props;

    return (
      <div>
        <Link to="/" onClick={() => setCategory("")}>
          <img src="/images/logo.png" alt="mincommerce" />
        </Link>
      </div>
    );
  }
}

export default Logo;
