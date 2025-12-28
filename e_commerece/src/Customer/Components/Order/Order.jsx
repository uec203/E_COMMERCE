import { Grid } from '@mui/material';
import React, { Component } from 'react';
import { useSelector } from 'react-redux';

const OrderStatus = [
    {label:"On The Way",value:"on_the_way"},
    {label:"Delivered",value:"delivered"},
    {label:"Cancelled",value:"cancelled"},
    {label:"Returned",value:"returned"},
]

const Order = () => {

    const orders = useSelector(store=>store.order.orders);
    
        return (
            <div className='px-5 lg:px-20 '>
                <Grid container sx={{justifyContent:"space-between"}}>
                   <Grid item xs={2.5}>
                        <div className='h-auto shadow-lg bg-white p-5 sticky top-5 text-left m-2'>
                            <h1 className='text-lg font-bold'>Filter </h1>
                            <div className='space-y-4 mt-10'>
                                <h1 className='font-semobold'>ORDER STATUS</h1>

                              { OrderStatus.map( (item) => 
                              (<div className='flex items-center'>
                                    <input id={item.value} defaultValue={item.value} type='checkbox' className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'/>
                                    <label className='ml-3 text-sm text-gray-600' htmlFor={item.value}>{item.label}</label>
                                </div>)
                              )}
                            </div>
                        </div>
                   </Grid>
                   <Grid item xs={9}>
                            <div className='space-y-5'>

                            </div>
                   </Grid>
                </Grid>
            </div>
        );
    }

export default Order;