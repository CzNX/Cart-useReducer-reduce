import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "clear":
      return { ...state, cart: [] };
    case "remove":
      return {
        ...state,
        cart: state.cart.filter((i) => i.id !== action.payload),
      };
    case "inc":
      return {
        ...state,
        cart: state.cart.map((i) => {
          if (i.id === action.payload) {
            return { ...i, amount: i.amount + 1 };
          }
          return i;
        }),
      };
    case "dec":
      return {
        ...state,
        cart: state.cart
          .map((i) => {
            if (i.id === action.payload) {
              return { ...i, amount: i.amount - 1 };
            }
            return i;
          })
          .filter((i) => i.amount !== 0),
      };

    case "calc":
      const { cart_total, total } = state.cart.reduce(
        (object, currentItem) => {
          // total of carts
          object.cart_total += currentItem.amount;
          // total of all items price
          object.total += currentItem.price * currentItem.amount;
          return object;
        },
        { cart_total: 0, total: 0 }
      );
      return { ...state, cart_total, total };

    default:
      return state;
  }
};

export default reducer;
