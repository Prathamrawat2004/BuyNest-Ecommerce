import React from 'react';
import {useSelector} from "react-redux";

const Cart = () => {
    const cart = useSelector((state)=> state.cart);
  return (
    <div className='cart-container'>
        <h2>Shopping Cart</h2>
        {cart.cartItems.length === 0 ? ():()}
         
    </div>
  )
}

export default Cart