import React, { Component, use, useEffect } from 'react';
import { Avatar, Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, AvatarGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer, getUsers } from '../../State/Admin/User/Action';

const CustomerTable = () => {
    let dispatch = useDispatch();
    let customers = useSelector(store => store.adminUser.users);
    let deletedCustomer = useSelector(store => store.adminUser.deletedUser);

    useEffect(() => {
        dispatch(getUsers());
    }, [deletedCustomer]);

    const handleDeleteCustomer = (customerId) => {
        dispatch(deleteCustomer(customerId));
    }

    return (
        <div className='p-10'>
            <Card className='mt-2 bg-[#1b1b1b]'  >
                <CardHeader title="Customers" />
                <TableContainer sx={{ bgcolor: "#242B2E", text: "white" }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'white' }} align="left">NAME</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">EMAIL</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">CITY</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left" >Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers && customers.map((customer) => (
                                <TableRow
                                    key={customer.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ color: 'white' }} align="left">{customer.firstName}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{customer.email}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{customer.address[0].city}</TableCell>
                                    <TableCell sx={{ color: 'white' }} onClick={()=>{handleDeleteCustomer(customer.id)}} align="left"><Button variant="contained" color="error">Delete</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </Card>
        </div>
    );
}

export default CustomerTable;