import React, { Component } from "react";
import styles from "./Categories.module.css";

import breakfast from "../../assets/media/breakfast.jpg";
import gym from "../../assets/media/Gym.jpg";
import groceries from "../../assets/media/groceries.png";

export default class Categories extends Component {
  render() {
    return (
      <div className={["Wrapper", styles.Categories].join(" ")}>
        <div
          onClick={() => this.props.history.push("cat/breakfast")}
          className={styles.Breakfast}
        >
          <img src={breakfast} alt="breakfast" />
          <p>BreakFast</p>
        </div>
        <div
          onClick={() => this.props.history.push("cat/gym")}
          className={styles.Gym}
        >
          <img src={gym} alt="gym food" />
          <p>Gym</p>
        </div>
        <div
          onClick={() => this.props.history.push("cat/groceries")}
          className={styles.Groceries}
        >
          <img src={groceries} alt="groceries" />
          <p>Groceries</p>
        </div>
      </div>
    );
  }
}
