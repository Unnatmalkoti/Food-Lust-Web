import React from "react";
import { KeyboardBackspace, Search } from "@material-ui/icons";
import styles from "./Header.module.css";
import { withRouter } from "react-router-dom";

const header = (props) => {
  return (
    <header className={styles.Header}>
      <KeyboardBackspace
        onClick={() => props.history.goBack()}
        className={styles.Icon}
      />
      <h1>FOODLUST</h1>
      <Search className={styles.Icon} />
    </header>
  );
};

export default withRouter(header);
