import React from "react";
import { Component } from "react";
import styles from "./Login.module.css";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Login as login } from "../../../store/actions/Auth";

import { ArrowBack } from "@material-ui/icons";

class Login extends Component {
  onLoginHandler = (e) => {
    e.preventDefault();
    let username = e.target.querySelector("#username").value;
    let password = e.target.querySelector("#password").value;
    this.props.login({ username, password });
  };

  render() {
    if (this.props.isAuthenticated) {
      let nextUrl = new URLSearchParams(this.props.location.search).get("next");
      this.props.history.replace(`${nextUrl}`);
    }
    return (
      <main className={styles.main}>
        {/* {this.props.isAuthenticated ? <Redirect to="" /> : null} */}
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
          <form
            onSubmit={this.onLoginHandler}
            className={styles.form}
            method="POST"
          >
            <h2>Login</h2>
            <p>Please login to continue.</p>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <div className={styles.rememberxforgot}>
              <span></span>
              <a
                className={styles.forgot}
                href="{%url 'account_reset_password'%}"
              >
                Forgot Password?
              </a>
            </div>

            <input className="login" type="submit" value="Login" />
          </form>
          <p className={styles.bottom_line}>
            If you have not created an account yet, then please{" "}
            <span
              className={styles.RedirectLink}
              onClick={() => this.props.history.replace("/signup")}
            >
              sign up
            </span>{" "}
            first.
          </p>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
