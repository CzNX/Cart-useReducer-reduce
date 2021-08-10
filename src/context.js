import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  cart_total: 0,
  total: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const inc = (id) => {
    dispatch({ type: "inc", payload: id });
  };
  const dec = (id) => {
    dispatch({ type: "dec", payload: id });
  };
  const remove = (id) => {
    dispatch({ type: "remove", payload: id });
  };
  const clear = () => {
    dispatch({ type: "clear" });
  };

  useEffect(() => {
    dispatch({ type: "calc" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        inc,
        dec,
        remove,
        clear,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
