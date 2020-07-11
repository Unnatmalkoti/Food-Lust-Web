import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Logout } from "../../store/actions/Auth";
import { connect } from "react-redux";
import Account from "../../components/User/Account/Account";
import { mapStateToOrders } from "../../store/mapFunctions";

class User extends Component {
  render() {
    return (
      <div className="Wrapper">
        <Switch>
          <Route
            path="/user"
            render={(props) => (
              <Account
                user={this.props.user}
                profile={this.props.profile}
                orders={this.props.orders}
                logout={this.props.logout}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    profile: state.auth.profile,
    orders: mapStateToOrders(state),
  };
};

const mapDisptachToProps = (dispatch) => ({
  logout: () => dispatch(Logout()),
});
export default connect(mapStateToProps, mapDisptachToProps)(User);
