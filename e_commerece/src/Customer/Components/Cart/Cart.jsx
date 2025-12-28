import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(store => store.cart);


    const handleCheckout = () => {
        navigate("/checkout?step=2");
    }

    useEffect(()=>{
        dispatch(getCart()) 
    },[cart.updateCartItem,cart.deleteCartItem]);

    return (
        <div className='lg:grid grid-cols-3 lg:px-16 relative'>
            <div className='col-span-2'>
                {cart.cart?.cartItems.map((item)=> <CartItem item={item}/>)}
            </div>
            <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 '>
                <div className='border shadow-[0_5px_15px_rgba(0,_0,_0,_0.35)] m-3'>
                    <p className='pb-4 opacity-60 font-bold uooercase'>Price Details</p>
                    <hr />
                    <div className='space-y-3 font-semibold m-3'>
                        <div className='flex justify-between pt-3 text-black'>
                            <span>Price </span>
                            <span>{cart.cart?.totalPrice} </span>
                        </div>
                        <div className='flex justify-between pt-3 text-black'>
                            <span>Discount</span>
                            <span className='text-green-600'>-₹{cart.cart?.discount} </span>
                        </div>
                        <div className='flex justify-between pt-3 text-black'>
                            <span>Delivery Charge </span>
                            <span className='text-green-600'>Free </span>
                        </div>

                        <div className='flex justify-between pt-3 text-black'>
                            <span>Total Amount </span>
                            <span className='text-green-600'>{cart.cart?.totalDiscountedPrice}</span>
                        </div>
                        <Button onClick={handleCheckout} className='w-full' color='secondary' variant='contained' sx={{ px: "1rem" }}>
                            check out
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Cart;