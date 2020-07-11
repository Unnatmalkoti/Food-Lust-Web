import React from "react";
import styles from "./ItemTile.module.css";
import { withRouter } from "react-router-dom";

const foodTile = (props) => {
  return (
    <div
      onClick={() => props.history.push(`/item/${props.id}`)}
      className={styles.Item}
    >
      <img src={props.image} alt="food" />
      <div
        className={[styles.Badge, props.quantity ? styles.Active : null].join(
          " "
        )}
      >
        <span>{props.quantity}</span>
      </div>
      <div className={styles.ItemDetails}>
        <span className={styles.ItemName}>{props.name}</span>
        <span className={styles.ItemPrice}>₹{props.price}</span>
      </div>
    </div>
  );
};
export default withRouter(foodTile);
