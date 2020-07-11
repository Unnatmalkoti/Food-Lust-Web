import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";

import AccountHeader from "./AccountHeader/AccountHeader";
import Orders from "../../Orders/Orders";
const Account = (props) => {
  let accounts = (
    <h2>
      Login Required
      <Redirect to="/login?next=user" />
    </h2>
  );
  if (props.user)
    accounts = (
      <Fragment>
        <AccountHeader user={props.user} profile={props.profile} />
        <Orders orders={props.orders} />
        <button onClick={props.logout}> Logout</button>
      </Fragment>
    );
  return <div>{accounts}</div>;
};

export default Account;
