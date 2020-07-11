import React, { Component } from "react";
import ItemCategory from "../../../components/Item/ItemCategory/ItemCategory";
import { connect } from "react-redux";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className={"Wrapper"}>
        <ItemCategory
          name={this.props.match.params.category}
          items={this.props.items}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let items = state.food.FoodItems.map((item) => {
    let quantity = state.cart.cartItems.find(
      (cartItem) => cartItem.id === item.id
    )?.quantity;
    return { ...item, quantity };
  });

  let searchQuery = null;
  let category = props.match.params.category;
  if (category === "breakfast") searchQuery = "BR";
  if (category === "gym") searchQuery = "GY";
  if (category === "groceries") searchQuery = "GR";

  items = items.filter((item) => item.category === searchQuery);

  return {
    items: items,
  };
};

export default connect(mapStateToProps, null)(Home);
