import React from "react";

export default function ProductQuantity(props) {
  function incrementQuantity(quantity) {
    props.setQuantity(quantity + 1);
  }
  function decrementQuantity(quantity) {
    if (quantity > 1) {
      props.setQuantity(quantity - 1);
    }
  }

  return (
    <div>
      <p className="quantity-text">Quantity</p>
      <div className="productQuantityContainer">
        <button
          className="productQuantityButton"
          onClick={() => decrementQuantity(props.selectedQuantity)}
        >
          -
        </button>
        <div className="productQuantity">{props.selectedQuantity}</div>
        <button
          className="productQuantityButton"
          onClick={() => incrementQuantity(props.selectedQuantity)}
        >
          +
        </button>
      </div>
    </div>
  );
}
