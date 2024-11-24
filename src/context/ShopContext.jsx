import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const currency = "$";
  const delivery_fee = 10;

  const addToCart = (itemId, size) => {
    if (!size) return toast.error("Select product size");

    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: {
        ...prevCart[itemId],
        [size]: (prevCart[itemId]?.[size] || 0) + 1,
      },
    }));
  };

  const updateQuantity = (itemId, size, quantity) =>
    setCartItems((prevCart) => ({
      ...prevCart,
      [itemId]: {
        ...prevCart[itemId],
        [size]: quantity,
      },
    }));

  const getCartCount = () =>
    Object.values(cartItems).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((acc, qty) => acc + qty, 0),
      0
    );

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      const item = products.find((p) => p._id === itemId);
      return (
        total +
        Object.entries(sizes).reduce(
          (acc, [_, qty]) => acc + item.price * qty,
          0
        )
      );
    }, 0);
 
  return (
    <ShopContext.Provider
      value={{
        currency,
        delivery_fee,
        products,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        updateQuantity,
        cartItems,
        getCartCount,
        getCartAmount,
        // Remove navigate from context provider and move it to components that need it
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
