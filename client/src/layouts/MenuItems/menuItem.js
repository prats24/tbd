import "./styles.css";

import React, { useState } from "react";

const MenuItem = ({ name, description, image, rating }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
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
          {quantity > 0 && (
            <>
              <button onClick={handleDecrement}>-</button>
              <p>{quantity}</p>
              <button onClick={handleIncrement}>+</button>
            </>
          )}
          {quantity === 0 && (
            <button onClick={handleAddToCart}>Add to Cart</button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
