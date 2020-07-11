import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { FetchFoodItems } from "./store/actions/Food";
import { FetchCartItems } from "./store/actions/Cart";
import { GetUser } from "./store/actions/Auth";

import Layout from "./components/Layout/Layout";
import Home from "./containers/Home/Home";
import ItemDescription from "./containers/ItemDescription/ItemDescription";
import Cart from "./containers/Cart/Cart";
import Categories from "./containers/Categories/Categories";
import User from "./containers/User/User";
import Category from "./containers/Categories/Category/Category";
import Checkout from "./containers/Checkout/Checkout";
import Login from "./containers/Forms/Login/Login";
import SignUp from "./containers/Forms/SignUp/SignUp";
import Loading from "./components/UI/Loaders/GlobalLoading";

class App extends Component {
  state = {
    showCart: false,
  };

  toggleShowCartHandler = () => {
    this.setState((prevState) => ({ showCart: !prevState.showCart }));
  };

  componentDidMount() {
    this.props.loadFoodItems();
    this.props.loadUser();
  }
  render() {
    let app = <Loading />;
    if (
      !this.props.food.isLoading &&
      !this.props.cart.isLoading &&
      !this.props.auth.isLoading &&
      this.props.auth.appLoaded
    ) {
      console.log("app render");
      app = (
        <BrowserRouter>
          <Switch>
            {/* BLANK LAYOUT */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />

            <Route
              path="/checkout"
              render={(props) => (
                <Layout onlyBG>
                  <Checkout {...props} />
                </Layout>
              )}
            />

            {/* COMPLETE LAYOUT  */}
            <Route path="">
              <Layout header bgVector nav cart={this.props.cart.cartItems}>
                <Switch>
                  <Route path="/user" component={User} />
                  <Route path="/cat/:category" component={Category} />
                  <Route path="/cat" component={Categories} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/item/:id" component={ItemDescription} />
                  <Route path="/" component={Home} />
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </BrowserRouter>
      );
    }
    return <div className="App">{app}</div>;
  }
}

const mapDispactchToProps = (dispatch) => ({
  loadFoodItems: () => dispatch(FetchFoodItems()),
  loadCart: () => dispatch(FetchCartItems()),
  loadUser: () => dispatch(GetUser()),
});

const mapStateToProps = (state) => ({
  food: state.food,
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispactchToProps)(App);
