import React from "react";
import axios from "axios";

const PayButton = ({ cartItems }) => {
  const handleCheckout = () => {
    axios
      .post(
        "https://buynest-ecommerce-backend-27.onrender.com/Stripe/create-checkout-session",
        { cartItems }
      )
      .then((res) => {
        if (res.data?.url) {
          history.push("/checkout-success"); // Redirect to your checkout-success route
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <button className="btn btn-primary" onClick={() => handleCheckout()}>
      Check Out
    </button>
  );
};

export default PayButton;
