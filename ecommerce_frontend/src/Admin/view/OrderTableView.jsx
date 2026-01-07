import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmOrders, deleteOrders, deliveredOrders, getOrders, shipOrders } from '../../State/Admin/Order/Action';
import { Avatar, Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AvatarGroup, MenuItem, Menu } from '@mui/material';

export const OrderTableView = () => {
    const dispatch = useDispatch();

    // Fetch orders from Redux state
    const { adminOrder } = useSelector(store => store);

    // Anchor for menu (for status update)
    const [anchorEl, setAnchorEl] = useState([]);
    const open = Boolean(anchorEl);

    // Handle opening the menu for a specific order
    const handleClick = (event, index) => {
        const newAnchorElArray = [...anchorEl];
        newAnchorElArray[index] = event.currentTarget;
        setAnchorEl(newAnchorElArray);
    };

    // Handle closing the menu for a specific order
    const handleClose = (index) => {
        const newAnchorElArray = [...anchorEl];
        newAnchorElArray[index] = null;
        setAnchorEl(newAnchorElArray);
    };

    // Fetch orders when the component mounts or when the adminOrder.orders state changes
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch, adminOrder.orders]); // We now watch for changes in the orders list

    // Handle actions for order statuses
    const handleShippedOrder = (orderId) => {
        dispatch(shipOrders(orderId));
        handleClose();
    };

    const handleConfirmedOrder = (orderId) => {
        dispatch(confirmOrders(orderId));
        handleClose();
    };

    const handleDeliveredOrder = (orderId) => {
        dispatch(deliveredOrders(orderId));
        handleClose();
    };

    const handleDeleteOrder = (orderId) => {
        dispatch(deleteOrders(orderId));
    };

    return (
        <div className="p-10">
            <Card className="mt-2 bg-[#1b1b1b]">
                <CardHeader title="Recent Orders" />
                <TableContainer sx={{ bgcolor: "#242B2E", color: "white" }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }}>Image</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Title</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Id</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Price</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adminOrder.orders?.map((item, index) => (
                                <TableRow
                                    key={item.id} // Using item.id as the unique key
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ color: 'white', textAlign: 'left' }} align="left">
                                        <AvatarGroup max={2} sx={{ justifyContent: "flex-start" }}>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
};

export default OrderTableView;
