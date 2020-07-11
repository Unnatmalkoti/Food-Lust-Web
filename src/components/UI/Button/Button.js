import React from "react";
import styles from "./Button.module.css";
import Spinner from "../Loaders/Spinner/Spinner";

const button = (props) => {
  let classes = [styles.Button];
  if (props.primary) classes.push(styles.Primary);

  return (
    <button
      onClick={props.clicked}
      className={classes.join(" ")}
      style={{ width: props.width }}
    >
      {props.children}
      {props.loading ? (
        <div className={styles.Spinner}>
          <Spinner />
        </div>
      ) : null}
    </button>
  );
};

export default button;
