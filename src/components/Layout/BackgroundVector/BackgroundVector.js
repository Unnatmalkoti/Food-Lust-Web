import React from "react";
import styles from "./BackgroundVector.module.css";
import Vector1 from "../../../assets/background/1.svg";
import Vector2 from "../../../assets/background/2.svg";

const backgroundVector = () => (
  <div className="BgVectors">
    <img className={styles.Vector1} src={Vector1} alt="background vector" />
    <img className={styles.Vector2} src={Vector2} alt="background vector" />
  </div>
);

export default backgroundVector;
