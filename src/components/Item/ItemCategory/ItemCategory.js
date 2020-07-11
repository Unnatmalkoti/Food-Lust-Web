import React from "react";
import ItemTile from "../ItemTile/ItemTile";
import styles from "./ItemCategory.module.css";

const itemCategory = (props) => {
  const itemsList = props.items.map((item) => (
    <ItemTile
      key={item.id}
      name={item.name}
      price={item.price}
      image={item.image}
      id={item.id}
      quantity={item.quantity}
    />
  ));
  return (
    <div className={styles.ItemCategory}>
      <h2 className={styles.Title}>{props.name}</h2>
      <div className={styles.ItemCategoryList}>{itemsList}</div>
    </div>
  );
};
export default itemCategory;
