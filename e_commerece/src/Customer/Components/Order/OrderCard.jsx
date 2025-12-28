import React, { Component } from 'react';
import { Grid } from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = () => {
        const navigate = useNavigate();
        return (
            <div onClick={()=>navigate(`/account/order/${5}`)}  className='p-5 shadow-md shadow-black hover:shadow-2xl border'>
                <Grid container spacing={2} sx={{justifyContent:"space-between"}}>

                    <Grid item xs={6}>
                        <div className='flex cursor-pointer'>
                            <img className='w-[5rem] h-[5rem] object-cover object-top' src='' alt=''></img>
                            <div className='ml-5 space-y-2'>
                                <p></p>
                                <p className='opacity-50 text-xs font-semibold'></p>
                                <p className='opacity-50 text-xs font-semibold'></p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <p>₹199</p>
                    </Grid>
                    <Grid item xs={4}>
                        {true && <div><p>
                            <AdjustIcon className='mr-2 text-sm text-green-600' sx={{width:'15px',height:'15px'}}/>
                            <span></span>
                        </p>
                        <p className='text-sm'></p>
                        </div>}
                        {false && <div><p>
                            
                            <span></span>
                        </p>
                        </div>}
                    </Grid>
                </Grid>
            </div>
        );
}

export default OrderCard;