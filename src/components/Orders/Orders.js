import React from "react";

import Order from "./Order/Order";

const orders = (props) => {
  let pastOrders = props.orders.filter(
    (order) =>
      order.status === "CBU" || order.status === "CBA" || order.status === "D"
  );
  let newOrders = props.orders.filter(
    (order) =>
      order.status !== "CBU" && order.status !== "CBA" && order.status !== "D"
  );

  newOrders.sort((a, b) => new Date(b.placed_at) - new Date(a.placed_at));
  pastOrders.sort((a, b) => new Date(b.placed_at) - new Date(a.placed_at));

  newOrders = newOrders.map((order) => (
    <Order key={order.id} order={order} type="new" />
  ));

  pastOrders = pastOrders.map((order) => (
    <Order key={order.id} order={order} type="past" />
  ));

  let style = { marginTop: "50px", fontSize: "20px" };

  return (
    <div>
      <div>
        <h3 style={style}>New Orders</h3>
        <div>{newOrders}</div>
      </div>
      <div>
        <h3 style={style}>Past Orders</h3>
        <div>{pastOrders}</div>
      </div>
    </div>
  );
};

export default orders;
