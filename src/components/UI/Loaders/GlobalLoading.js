import React from "react";
import styles from "./GlobalLoading.module.css";

export default (props) => {
  return (
    <div className={styles.LoadingLogo}>
      <h1>
        Food
        <br />
        Lust
      </h1>
      <p>Starting up...</p>
    </div>
  );
};
