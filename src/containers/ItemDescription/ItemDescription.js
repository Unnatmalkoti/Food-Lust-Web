import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToFoodItems } from "../../store/mapFunctions";

import QuantityControl from "../../components/UI/QuantityControl/QuantityControl";
import Button from "../../components/UI/Button/Button";

import styles from "./ItemDescription.module.css";
import "./styles.css";
import { AddToCart, RemoveFromCart } from "../../store/actions/Cart";

class ItemDescription extends Component {
  state = {
    quantity: 1,
  };

  minusedHandler = () => {
    if (this.state.quantity > 1)
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    else if (this.state.quantity === 1)
      this.props.addToCart({ item: this.props.item.id, quantity: 0 });
  };

  plusedHandler = () => {
    if (this.state.quantity < 6)
      this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  componentDidMount() {
    if (
      this.props.item.quantity &&
      this.props.item.quantity !== this.state.quantity
    )
      this.setState({ quantity: this.props.item.quantity });
  }
  componentDidUpdate() {}

  button = () => {
    let item = this.props.item,
      isUpdating = this.props.cart.isUpdating;

    let clicked = () =>
        this.props.addToCart({ item: item.id, quantity: this.state.quantity }),
      label = "Add To Cart";

    if (this.state.quantity === this.props.item.quantity) {
      clicked = () => this.props.history.push("/cart");
      label = "View Cart";
    }

    if (
      this.props.item.quantity &&
      this.props.item.quantity !== this.state.quantity
    )
      label = "Update Cart";

    return (
      <Button clicked={clicked} width="100%" loading={isUpdating} primary>
        {label}
      </Button>
    );
  };

  render() {
    let item = this.props.item;
    return (
      <div className="Wrapper">
        <img className={styles.ItemImage} src={item.image} alt={item.name} />
        <h2 className={styles.ItemName}>{item.name}</h2>
        <p className={styles.Serve}>1 Serve</p>
        <div className={styles.QtyPriceDiv}>
          <QuantityControl
            minused={this.minusedHandler}
            plused={this.plusedHandler}
            quantity={this.state.quantity}
          />
          <span className={styles.Price}>₹{item.price}</span>
        </div>
        <h3 className={styles.DescTitle}>Description</h3>
        <p className={styles.Desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi m, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum
        </p>
        <div className={styles.AddToCart}>{this.button()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  let id = parseInt(props.match.params.id);

  let FoodItems = mapStateToFoodItems(state);
  let item = FoodItems.find((item) => item.id === id);

  return {
    cart: state.cart,
    item: item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(AddToCart(item)),
    removeFromCart: (id) => dispatch(RemoveFromCart(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemDescription);
