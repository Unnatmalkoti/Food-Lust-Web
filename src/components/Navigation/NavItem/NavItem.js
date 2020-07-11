import React, { Fragment } from "react";
import styles from "./NavItem.module.css";
import { NavLink } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  List,
  ShoppingCartOutlined,
  ShoppingCart,
  AccountCircleOutlined,
  AccountCircle,
} from "@material-ui/icons";

const navItem = (props) => {
  let itemContent = null;
  switch (props.type) {
    case "home":
      itemContent = (
        <Fragment>
          <div className={styles.IconDiv}>
            <Home className={styles.ActiveIcon} />
            <HomeOutlined className={styles.InactiveIcon} />
          </div>
          <span>Home</span>
        </Fragment>
      );
      break;

    case "cat":
      itemContent = (
        <Fragment>
          <div className={styles.IconDiv}>
            <List />
          </div>
          <span>Categories</span>
        </Fragment>
      );
      break;

    case "cart":
      itemContent = (
        <Fragment>
          <div className={styles.IconDiv}>
            {props.cart.length ? (
              <span className={styles.IconNotif}>{props.cart.length}</span>
            ) : null}
            <ShoppingCartOutlined className={styles.InactiveIcon} />
            <ShoppingCart className={styles.ActiveIcon} />
          </div>
          <span>Cart</span>
        </Fragment>
      );
      break;

    case "account":
      itemContent = (
        <Fragment>
          <div className={styles.IconDiv}>
            <AccountCircleOutlined className={styles.InactiveIcon} />
            <AccountCircle className={styles.ActiveIcon} />
          </div>
          <span>Account</span>
        </Fragment>
      );
      break;
    default:
      break;
  }
  return (
    <NavLink
      className={styles.NavItem}
      activeClassName={styles.Active}
      to={props.to}
      exact={props.exact}
    >
      {itemContent}
    </NavLink>
  );
};

export default navItem;
