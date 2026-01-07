import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOrders, deleteOrders, deliveredOrders, getOrders, shipOrders } from '../../State/Admin/Order/Action';
import { Avatar, Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AvatarGroup, MenuItem, Menu } from '@mui/material';

const OrderTable = () => {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.adminOrder.orders);
    const [anchorEl, setAnchorEl] = useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event, index) => {
        const newAnchorElArray = [...anchorEl];
        newAnchorElArray[index] = event.currentTarget;
        setAnchorEl(newAnchorElArray);
    };

    const handleClose = (index) => {
        const newAnchorElArray = [...anchorEl];
        newAnchorElArray[index] = null;
        setAnchorEl(newAnchorElArray);
    };

    useEffect(() => {
        dispatch(getOrders());
    }, [orders, dispatch]);

    const handleShippedOrder = (orderId) => {
        dispatch(shipOrders(orderId));
        dispatch(getOrders());
        handleClose();
    };

    const handleConfirmedOrder = (orderId) => {
        dispatch(confirmOrders(orderId));
        dispatch(getOrders());
        handleClose();
    };

    const handleDeliveredOrder = (orderId) => {
        dispatch(deliveredOrders(orderId));
        dispatch(getOrders());
        handleClose();
    };

    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrders(orderId));
        dispatch(getOrders());
    };

    return (
        <div className='p-10'>
            <Card className='mt-2 bg-[#1b1b1b]'>
                <CardHeader title="All Orders" />
                <TableContainer sx={{ bgcolor: "#242B2E", text: "white" }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}>Image</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Title</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Id</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Price</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Status</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Update</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.map((item, index) => (
                                <TableRow
                                    key={item.id}  // Using item.id as the unique key instead of item.name
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='left'>
                                        <AvatarGroup max={1} sx={{ justifyContent: "start" }}>
                                            {item.orderItems?.map((orderItem) => (
                                                <Avatar key={orderItem.product.id} src={orderItem.product.imageUrl} />
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} component="th" scope="row">
                                        {item.orderItems?.map((orderItem) => (
                                            <p key={orderItem.product.id}>{orderItem.product.title}</p>
                                        ))}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.id}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.totalPrice}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.orderStatus}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">
                                        <Button
                                            id="basic-button"
                                            aria-haspopup="true"
                                            onClick={(e) => handleClick(e, index)}
                                            aria-controls={`basic-menu-${item.id}`}
                                            aria-expanded={Boolean(anchorEl[index])}
                                        >
                                            Status
                                        </Button>
                                        <Menu
                                            id={`basic-menu-${item.id}`}
                                            anchorEl={anchorEl[index]}
                                            open={Boolean(anchorEl[index])}
                                            onClose={() => handleClose(index)}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={() => handleConfirmedOrder(item.id)}>Confirmed Order</MenuItem>
                                            <MenuItem onClick={() => handleShippedOrder(item.id)}>Shipped Order</MenuItem>
                                            <MenuItem onClick={() => handleDeliveredOrder(item.id)}>Delivered Order</MenuItem>
                                        </Menu>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button onClick={() => handleDeleteOrder(item.id)} variant='outlined'>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
};

export default OrderTable;
