export const mapStateToCartItems = (state) => {
  let cartItems = state.cart.cartItems.map((cartItem) => {
    let foodItem = state.food.FoodItems.find(
      (item) => item.id === cartItem.item
    );
    return { ...cartItem, item: foodItem };
  });
  cartItems.sort((a, b) => (a.item.name < b.item.name ? -1 : 1));
  return cartItems;
};

export const mapStateToFoodItems = (state) => {
  let items = state.food.FoodItems.map((item) => {
    let quantity = state.cart.cartItems.find(
      (cartItem) => cartItem.item === item.id
    )?.quantity;
    return { ...item, quantity };
  });
  return items;
};

export const mapStateToOrders = (state) => {
  let orders = state.orders.orders;
  let food = state.food.FoodItems;

  orders = orders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({
      ...food.find((foodItem) => foodItem.id === item.item),
      ...item,
    })),
  }));

  return orders;
};
