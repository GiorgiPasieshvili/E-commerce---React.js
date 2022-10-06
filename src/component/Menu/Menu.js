import { PureComponent } from "react";
import { Link } from "react-router-dom";

/* Graphql Studd */
import { Query } from "@apollo/client/react/components";
import { GET_CATEGORIES } from "query/menu.query";

/* Redux Stuff */
import { connect } from "react-redux";
import { changeCategory } from "store/categorySlice";

import "./Menu.scss";

const mapStateToProps = (state) => ({
  currentCategory: state.category.current,
});

const mapDispatchToProps = (dispatch) => ({
  changeCategory: (payload) => dispatch(changeCategory(payload)),
});

class Menu extends PureComponent {
  render() {
    const { currentCategory, changeCategory } = this.props;

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
                  className={name === currentCategory ? "active" : null}
                  onClick={() => changeCategory(name)}
                >
                  <Link to={"/category/" + name}>{name}</Link>
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
