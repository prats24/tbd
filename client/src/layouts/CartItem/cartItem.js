import "./styles.css";

import React, { useState } from 'react';
import { useCart } from "../../context/CartContext";

function CartItem({ name, quantity, id, price }) {
  const {cartItems, updateCart, addToCart} = useCart();  
  const [itemQuantity, setItemQuantity] = useState(0);

  const handleIncrement = () => {
    const index = cartItems.findIndex((item) => item.id === id);
    console.log(index, id, cartItems);
    if (index !== -1) {
      const updatedCartItem = {
        ...cartItems[index],
        quantity: cartItems[index].quantity + 1,
      };
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = updatedCartItem;
      updateCart(updatedCartItems);
      // addToCart(updatedItem);
    }
  };
  const handleDecrement = () => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity -= 1;
      console.log(updatedCartItems[index].quantity);
      console.log(updatedCartItems[index].quantity == 0);
      if (updatedCartItems[index].quantity == 0) {
        console.log('here');
        updatedCartItems.splice(index, 1);
        console.log(updatedCartItems);
      }
      updateCart(updatedCartItems);
      console.log(cartItems);
    }else{
      console.log('index nf')
    }
  };

  const handleRemoveItem = () => {
    // Code to remove item from cart
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <h4>{name}</h4>
        <p>Price: 120</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={() => handleDecrement()}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleIncrement()}>+</button>
      </div>
    </div>
  );
}

export default CartItem;