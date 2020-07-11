import React from "react";
import styles from "./Order.module.css";

const order = (props) => {
  let items = props.order.items.map((item) => (
    <div className={styles.Item} key={item.id}>
      <span className={styles.Multiplier}>{item.quantity}x</span>
      <span>{item.name}</span>
    </div>
  ));

  let classes = [styles.Order, props.type === "past" ? styles.OrderPast : null];
  return (
    <div className={classes.join(" ")}>
      <div className={styles.OrderDetails}>
        <div>{items}</div>
        <div className={styles.Price}>₹{props.order.total}</div>
      </div>
      <div className={styles.Status}>
        <div>
          <div className={styles.Timestamp}>
            {new Date(props.order.placed_at).toLocaleTimeString()},{" "}
            {new Date(props.order.placed_at).toDateString()}
          </div>
          <div>{props.order.full_status}</div>
        </div>

        <span>More {">"}</span>
      </div>
    </div>
  );
};

export default order;
