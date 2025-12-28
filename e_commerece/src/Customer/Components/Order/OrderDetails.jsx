import React, { Component } from 'react';
import AddressCard from '../AddressCard/AddressCard';
import OrderTaker from './OrderTaker';
import { Box, Grid } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { StarBorder } from '@mui/icons-material';
const OrderDetails = () => {
        
        return (

            <div className='px-5 lg:px-20'>
                <div>
                <h1 className='text-lg font-bold py-7'>Delivery Address</h1>
                <AddressCard/>
                </div>
                <div className='py-20'>
                    <OrderTaker activeStep={2}/>
                </div>
                <Grid container className='space-y-5'>
                    <Grid item container className='shadow-xl rounded-md p-5 border' sx={{alignItems:"center",justifyContent:"space-between"}}>
                        <Grid item xs={6}>
                            <div className='flex items-center space-x-2'>
                                <img src='' alt='' className='w-[5rem] h-[5rem] object-cover object-top'/>
                                <div className='ml-5 space-y-2'>
                                    <p className='font-semibold'></p>
                                    <p className='space-x-5 text-xs opacity-50 font-semibold'>
                                        <span></span>
                                        <span></span>
                                    </p>
                                    <p></p>
                                    <p></p>
                                </div>
                            </div>
                        </Grid>

                        <Grid item >
                            <Box sx={{color:deepOrange[500]}}>
                                <StarBorder className='px-2 text-5xl' sx={
                                    {fontSize:"2rem"}
                                }></StarBorder>
                                <span></span>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
               
            </div>
        );
}

export default OrderDetails;