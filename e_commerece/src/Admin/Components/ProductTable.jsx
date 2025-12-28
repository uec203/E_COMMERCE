import { Avatar, Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';

const ProductTable = () => {

    const dispatch = useDispatch();
    const product = useSelector(store => store.product);


    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId));
    }

    useEffect(() => {
        const data = {
            category: 'defaultCategory',  // Default category
            colors: [],                   // Default empty list for colors
            sizes: [],                    // Default empty list for sizes
            minPrice: 0,                // Default value for minPrice
            maxPrice: 1000000,                // Default value for maxPrice
            minDiscount: 0,                // Default discount
            sort: 'price_low',             // Default sort by price low
            stock: 'inStock',              // Default stock filter
            pageNumber: 1,                 // Default to page 1
            pageSize: 10                  // Default page size
        };
        console.log("Fetching products with data:", data.category);
        dispatch(findProducts(data));

    }, [product.deletedProduct])


    return (
        <div className='p-5 text-white'>
            <Card className='mt-2 bg-[#1b1b1b]'  >
                <CardHeader title="All Products" />
                <TableContainer sx={{ bgcolor: "#242B2E", color: "white" }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ color: 'white' }} >Image</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Title</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Category</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Price</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Discount Percentage</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">Quantity</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left" >Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product?.products?.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='left'>
                                        <Avatar src={item.imageUrl}></Avatar>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} component="th" scope="row">
                                        {item.title}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.category.name}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.price}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.discountPercent}%</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">{item.quantity}</TableCell>
                                    <TableCell sx={{ color: 'white' }} align="left">
                                        <Button onClick={() => handleProductDelete(item.id)} variant='outlined'>
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
}

export default ProductTable;