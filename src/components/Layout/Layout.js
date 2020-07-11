import React, { Fragment } from "react";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import BackgroundVector from "./BackgroundVector/BackgroundVector";

const layout = ({ onlyBG, ...props }) => {
  return (
    <Fragment>
      <BackgroundVector />
      {onlyBG ? null : <Header />}
      <main style={{ overflowY: "scroll" }}>{props.children}</main>
      {onlyBG ? null : <Navigation cart={props.cart} />}
    </Fragment>
  );
};

export default layout;
