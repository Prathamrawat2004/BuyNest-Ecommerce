import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PayButton = ({ cartItems }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    axios
      .post(
        "https://buynest-ecommerce-backend-27.onrender.com/Stripe/create-checkout-session",
        { cartItems }
      )
      .then((res) => {
        if (res.data?.url) {
          navigate("/checkout-success"); // Redirect to your checkout-success route
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
