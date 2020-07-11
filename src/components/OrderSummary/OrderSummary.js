import React from "react";
import styles from "./OrderSummary.module.css";

export default (props) => {
  let calcSubTotal = (cartItems) => {
    let sTotal = 0;
    cartItems.forEach((cartItem) => {
      sTotal += cartItem.quantity * cartItem.item.price;
    });
    return sTotal;
  };
  return (
    <div>
      <h3 className={styles.PageTitle}>5. Order Summary</h3>
      <div>
        <p className={styles.SummaryItem}>
          <span>Order Items</span> <span>₹{calcSubTotal(props.cartItems)}</span>
        </p>
        <div className={styles.AdditionalCharges}>
          <p className={styles.SummaryItem}>
            <span>Delivery Charges</span>
            <span>₹40</span>
          </p>
          <p className={styles.SummaryItem}>
            <span>GST @18%</span> <span>₹40</span>
          </p>
        </div>
        <p className={styles.Total}>
          <span>Total</span>
          <span>₹600</span>
        </p>
      </div>
    </div>
  );
};
