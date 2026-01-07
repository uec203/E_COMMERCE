import { Grid } from '@mui/material';
import React, { Component } from 'react';
import { OrderTableView } from '../view/OrderTableView';
import ProductTableView from '../view/ProductTableView';

const DashBoard = () => {
    return (
        <div className='p-10'>
            <Grid
                container
                direction="column"
                sx={{
                    height: "100vh",
                    p: 2,
                    gap: 2,
                }}
            >
                <Grid item sx={{ flex: 1, boxShadow: 3, borderRadius: 2 }}>
                    <OrderTableView />
                </Grid>

                <Grid item sx={{ flex: 1, boxShadow: 3, borderRadius: 2 }}>
                    <ProductTableView />
                </Grid>
            </Grid>

        </div>
    );
}

export default DashBoard;