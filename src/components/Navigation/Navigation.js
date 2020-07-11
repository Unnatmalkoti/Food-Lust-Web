import React from "react";
import NavItem from "./NavItem/NavItem";
import styles from "./Navigation.module.css";

const navigation = (props) => (
  <nav className={styles.NavBar}>
    <ul>
      <NavItem to="/" type="home" exact />
      <NavItem to="/cat" type="cat" />
      <NavItem to="/cart" type="cart" cart={props.cart} />
      <NavItem to="/user" type="account" />
    </ul>
  </nav>
);

export default navigation;
