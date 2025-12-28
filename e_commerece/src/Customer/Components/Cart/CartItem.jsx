import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { getCart, removeCartItem, updateCartItem } from '../../../State/Cart/Action';

const CartItem = ({item}) => {
    const disptach = useDispatch();

    const handleUpdateCartItem = (num,item) => {
        const data = {...item, quantity: item.quantity + num};
        console.log("Updating cart item:", item, "by", num);
        disptach(updateCartItem(data));
        disptach(getCart());
    }

    const handleRemoveCartItem = () => {
        disptach(removeCartItem(item.id));
        disptach(getCart());
    }

    return (
        <div className='p-5 shawdow-lg border rounded-md m-3 shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1),_0_2px_4px_-1px_rgba(0,_0,_0,_0.06)]' >
            <div className='flex items-center'>

                <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img className='w-full h-full object-top object-cover'
                     src={item.product?.imageUrl}
                      alt=''>

                    </img>
                </div>
                <div className='ml-5 space-y-1 text-left'>

                    <p className='font-semibold'>{item.product.title}</p>
                    <p className='opacity-70'> Size:{item.size} </p>
                    <p className='opacity-70 mt-2'> Seller: {item.product.brand}</p>
                    <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 pt-6'>
                        <p className='font-semibold'>₹{item.price}</p>
                        <p className='opacity line-through'>₹{item.discountedPrice}</p>
                        <p className='font-semibold text-green-600'>{item.discountPercent}% off</p>
                    </div>
                </div>
            </div>
            <div className='lg:flex items-center pt-4 lg:space-x-10'>
                <div className='flex items-center space-x-2'>
                    <IconButton onClick={()=>{handleUpdateCartItem(-1,item)}} disabled={item.quantity<=1}>
                        <RemoveCircleOutline/>
                    </IconButton>
                    <span className='py-1 px-7'>
                    {item.quantity}
                    </span>
                    <IconButton onClick={()=>{handleUpdateCartItem(1,item)}}>
                        <AddCircleOutline/>
                    </IconButton>
                    </div>
                    <div className='flex items-center mx-3'>
                        <Button variant='contained' onClick={handleRemoveCartItem}>remove </Button>
                    </div>
                </div>
        </div>
    );
}

export default CartItem;