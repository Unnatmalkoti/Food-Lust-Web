import React from "react";
import styles from "./CartTile.module.css";
import { withRouter } from "react-router-dom";
import QuantityControl from "../../UI/QuantityControl/QuantityControl";

const CartTile = (props) => {
  let foodItem = props.item.item;
  const goToItem = () => {
    props.history.replace(`/item/${props.item.item.id}`);
  };

  let minused = () => {
    if (props.item.quantity > 0)
      props.addToCart({ quantity: props.item.quantity - 1, item: foodItem.id });
  };
  let plused = () => {
    if (props.item.quantity < 10)
      props.addToCart({ quantity: props.item.quantity + 1, item: foodItem.id });
  };

  let getCategory = (foodItem) => {
    let cat = foodItem.category;
    if (cat === "GY") return "Gym";
    if (cat === "BR") return "Breakfast";
    if (cat === "GR") return "Groceries";
  };
  return (
    <div className={styles.CartTile}>
      <img
        onClick={goToItem}
        className={styles.Image}
        src={foodItem.image}
        alt="food"
      />
      <div onClick={goToItem} className={styles.MiddleDiv}>
        <div>
          <h3>{foodItem.name}</h3>
          <p className={styles.Category}>{getCategory(foodItem)}</p>
        </div>
        <span className={styles.Price}>
          ₹{foodItem.price * props.item.quantity}
        </span>
      </div>
      <div className={styles.QuantityTab}>
        <QuantityControl
          minused={minused}
          plused={plused}
          quantity={props.item.quantity}
          primary
        />
      </div>
    </div>
  );
};

export default withRouter(CartTile);
