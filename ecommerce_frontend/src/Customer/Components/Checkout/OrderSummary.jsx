import React, { Component, useEffect } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import CartItem from '../Cart/CartItem';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { useLocation } from 'react-router-dom';
import { createPayment } from '../../../State/Payment/Action';
const OrderSummary = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const order = useSelector(store => store.order);

    const searchParam = new URLSearchParams(location.search);
    const orderId = searchParam.get("order_id");

    useEffect(() => {
        dispatch(getOrderById(orderId));
    }, [orderId]);

    const handleCheckout = () => {
        dispatch(createPayment(orderId));
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border'>
                <AddressCard address={order.order?.shippingAddress} />
            </div>
            <div className='lg:grid grid-cols-3 relative w-full'>
                <div className='col-span-2'>
                    {order.order?.orderItems.map((item, index) => (
                        <CartItem key={index} item={item} />
                    ))}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 '>
                    <div className='border shadow-[0_5px_15px_rgba(0,_0,_0,_0.35)] m-3'>
                        <p className='pb-4 opacity-60 font-bold uooercase'>Price Details</p>
                        <hr />
                        <div className='space-y-3 font-semibold m-3'>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Price </span>
                                <span>₹{order.order?.totalPrice} </span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Discount</span>
                                <span className='text-green-600'>₹{order.order?.discount} </span>
                            </div>
                            <div className='flex justify-between pt-3 text-black'>
                                <span>Delivery Charge </span>
                                <span className='text-green-600'>Free </span>
                            </div>

                            <div className='flex justify-between pt-3 text-black'>
                                <span>Total Amount </span>
                                <span className='text-green-600'>₹{order.order?.totalDiscountedPrice} </span>
                            </div>
                            <Button className='w-full' color='secondary' onClick={handleCheckout} variant='contained' sx={{ px: "1rem" }}>
                                Check out
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default OrderSummary;