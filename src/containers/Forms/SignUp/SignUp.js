import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./SignUp.module.css";
import { ArrowBack } from "@material-ui/icons";

class SignUp extends Component {
  render() {
    onsubmit = (e) => {
      e.preventDefault();
    };
    return (
      <main className={styles.main}>
        <div className={styles.left}>
          <h1>Food</h1>
          <h1>Lust</h1>
        </div>
        <div className={styles.login_side}>
          <div
            onClick={() => this.props.history.goBack()}
            className={styles.ArrowBack}
          >
            <ArrowBack className={styles.Icon} />
            <span>Go back</span>
          </div>
          <form className={styles.form} method="POST">
            <h2>Sign Up</h2>
            <p>Gotta sign up before signing in.</p>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            <input type="email" id="email" name="email" placeholder="Email" />
            <input
              type="password1"
              id="password1"
              name="password1"
              placeholder="Password"
            />
            <input
              type="password1"
              id="password1"
              name="password1"
              className="password1"
              placeholder="Confirm Password"
            />

            <input type="submit" value="Sign Up" />
          </form>
          <p className={styles.bottom_line}>
            Already have an account? Then please{" "}
            <span
              className={styles.RedirectLink}
              onClick={() => this.props.history.replace("/login/")}
            >
              Sign in.
            </span>
          </p>
        </div>
      </main>
    );
  }
}

export default withRouter(SignUp);
