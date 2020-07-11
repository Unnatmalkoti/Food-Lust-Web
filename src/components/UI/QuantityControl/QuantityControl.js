import React from "react";
import styles from "./QuantityControl.module.css";
import { Add, Remove } from "@material-ui/icons";

const qualityControl = (props) => {
  return (
    <div
      className={[styles.Control, props.primary ? styles.Primary : null].join(
        " "
      )}
    >
      <span onClick={props.minused} className={styles.Minus}>
        <Remove />
      </span>
      <span className={styles.Value}>{props.quantity}</span>
      <span onClick={props.plused} className={styles.Plus}>
        <Add />
      </span>
    </div>
  );
};

export default qualityControl;
