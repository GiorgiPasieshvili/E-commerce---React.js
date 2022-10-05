import { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "query/menu.query";

import "./Menu.scss";

class Menu extends PureComponent {
  render() {
    const { category, setCategory } = this.props;

    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <div className="preloader"></div>;
          if (error) console.log(error);

          return (
            <ul className="menu">
              {data.categories.map(({ name }, index) => (
                <li
                  key={index}
                  className={name === category ? "active" : undefined}
                  onClick={() => setCategory(name)}
                >
                  <Link to={`/category/${name}`}>{name}</Link>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default Menu;
