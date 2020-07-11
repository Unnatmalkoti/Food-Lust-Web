import React, { Component } from "react";
import CheckoutForm from "./CheckoutForm/CheckoutFrom";
import { connect } from "react-redux";
import { ChevronLeft } from "@material-ui/icons";
import styles from "./Checkout.module.css";
import { mapStateToCartItems } from "../../store/mapFunctions";
import { PlaceOrder, ResetPlacedSuccessfully } from "../../store/actions/Order";

class Checkout extends Component {
  render() {
    if (!this.props.cartItems.length) this.props.history.replace("");
    if (!this.props.auth.isAuthenticated)
      this.props.history.replace("login?next=checkout");
    if (this.props.orders.placedSuccessfully) {
      this.props.history.replace("user");
      this.props.resetPlacedSuccessfully();
    }

    return (
      <div className="Wrapper">
        <div className={styles.Checkout}>
          <h2 className={styles.PageTitle}>
            <ChevronLeft onClick={() => this.props.history.goBack()} /> Checkout
          </h2>
          <CheckoutForm
            placeOrder={this.props.placeOrder}
            cartItems={this.props.cartItems}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: mapStateToCartItems(state),
  orders: state.orders,
  cart: state.cart,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  placeOrder: (data) => dispatch(PlaceOrder(data)),
  resetPlacedSuccessfully: () => dispatch(ResetPlacedSuccessfully()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
