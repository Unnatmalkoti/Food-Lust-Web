import React, { Component, Fragment } from "react";
import styles from "./Cart.module.css";
import { connect } from "react-redux";
import { mapStateToCartItems } from "../../store/mapFunctions";
import { AddToCart } from "../../store/actions/Cart";

import CartTile from "../../components/Item/CartTile/CartTile";
import Button from "../../components/UI/Button/Button";
import { ChevronRight } from "@material-ui/icons";
import EmptyCart from "../../assets/media/empty_cart.svg";

class Cart extends Component {
  calcSubTotal = (cartItems) => {
    let sTotal = 0;
    cartItems.forEach((cartItem) => {
      sTotal += cartItem.quantity * cartItem.item.price;
    });
    return sTotal;
  };

  render() {
    let CartItems = (
      <div className={styles.CartItemsTable}>
        {this.props.cart.cartItems.map((item) => (
          <CartTile
            key={item.item.id}
            item={item}
            addToCart={this.props.addToCart}
          />
        ))}
      </div>
    );

    let cart = (
      <div className={styles.EmptyCartDiv}>
        <img src={EmptyCart} alt="Empty Cart Illustration" />
        <p>Your cart is empty.</p>
      </div>
    );

    if (this.props.cart.cartItems.length)
      cart = (
        <Fragment>
          <h2>Cart({this.props.cart.cartItems.length})</h2>
          {CartItems}
          <div className={styles.BottomDiv}>
            <h4 className={styles.SubTotal}>
              <span className={styles.Label}>SubTotal:</span>
              <span className={styles.Value}>
                ₹{this.calcSubTotal(this.props.cart.cartItems)}
              </span>
            </h4>
            <Button
              clicked={() => this.props.history.push("/checkout")}
              width="100%"
              primary
            >
              Checkout
              <ChevronRight />
            </Button>
          </div>
        </Fragment>
      );
    return (
      <div className={styles.Cart}>
        <div className="Wrapper">{cart}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(AddToCart(item)),
  };
};

const mapStateToProps = (state) => {
  return {
    cart: { ...state.cart, cartItems: mapStateToCartItems(state) },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
