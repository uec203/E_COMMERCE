import { Step, StepLabel, Stepper } from '@mui/material';
import React, { Component } from 'react';

const steps = [
    "Placed",
    "Order Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
]

const OrderTaker = ({activeStep}) => {

        return (
            <div className='w-full'>
                <Stepper activeStep={activeStep} alternativeLabel>
                {
                    steps.map((label)=>(
                        <Step>
                            <StepLabel sx={{color:"#9155FD",fontSize:"44px"}}>
                                {label}
                            </StepLabel>
                        </Step>
                    ))
                }
                </Stepper>
            </div>
        );
}

export default OrderTaker; 