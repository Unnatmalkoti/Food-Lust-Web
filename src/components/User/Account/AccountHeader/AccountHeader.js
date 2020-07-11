import React from "react";
import styles from "./AccountHeader.module.css";

const accountHeader = (props) => {
  return (
    <div className={styles.AccountHeader}>
      <div className={styles.UserImage}>
        <img alt="user" src={props.profile.profile_picuture}></img>
      </div>

      <div className={styles.UserDetails}>
        <p className={styles.Name}>{props.user?.username}</p>
        <p className={styles.Email}>{props.user?.email}</p>
      </div>
    </div>
  );
};

export default accountHeader;
