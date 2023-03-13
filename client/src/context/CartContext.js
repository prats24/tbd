import { createContext, useContext, useState } from 'react';

export const CartContext = createContext([]);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
    // Update the item in the database here using a patch network call
  };
  const updateCart = (items) =>{
    setCartItems(items);
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
