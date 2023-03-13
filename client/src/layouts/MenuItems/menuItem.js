import "./styles.css";
import { useCart } from '../../context/CartContext';

import React, { useState } from "react";

const MenuItem = ({ id, name, description, image, rating }) => {
  const { cartItems, addToCart, updateCart } = useCart();
  
  const [quantity, setQuantity] = useState(cartItems[cartItems.findIndex((item) => item.id === id)]?.quantity??0);
  
  const handleAddToCart = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    addToCart({ id, name, description, image, rating, quantity: 1});
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    const index = cartItems.findIndex((item) => item.id === id);
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
    setQuantity((prevQuantity) => prevQuantity - 1);
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

  return (
    <div className="menu-item">
      <div className="menu-item-image-container">
        <img src='https://a.rgbimg.com/users/x/xy/xymonau/600/ttLhPMi.jpg' alt={name} className="menu-item-image" />
      </div>
      <div className="menu-item-details">
        <div className="NameType">
        <h3>{name}</h3>
        <div className="Type">
          <img src='NonVeg.png' alt={name}/>
          </div>
        </div>
        <p>A hamburger, or simply burger, is a sandwich consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll.</p>
        <div className="PriceCart">
        <div className="menu-item-rating">₹ 555</div>
        <div className="menu-item-quantity">
          {cartItems[cartItems?.findIndex((item) => item.id === id)]?.quantity && (
            <>
              <button onClick={handleDecrement}>-</button>
              <p>{cartItems[cartItems?.findIndex((item) => item.id === id)]?.quantity||0}</p>
              <button onClick={handleIncrement}>+</button>
            </>
          )}
          {!cartItems[cartItems?.findIndex((item) => item.id === id)]?.quantity && (
            <button onClick={handleAddToCart}>Add to Cart</button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
