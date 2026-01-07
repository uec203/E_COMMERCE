import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Customer/pages/HomePage/HomePage';
import Cart from '../Customer/Components/Cart/Cart';
import Product from '../Customer/Components/Product/Product';
import Navigation from '../Customer/Components/Navigation/Navigation';
import Footer from '../Customer/Components/Footer/Footer'
import ProductDetails from '../Customer/Components/ProductDetails/ProductDetails';
import Checkout from '../Customer/Components/Checkout/Checkout';
import Order from '../Customer/Components/Order/Order';
import OrderDetails from '../Customer/Components/Order/OrderDetails';


class CustomerRoutes extends Component {
    render() {
        return (
            <div>
                <div>
                    <Navigation />
                </div>
                <Routes>
                    <Route path='/*' element={<HomePage />}></Route>
                    <Route path='/login' element={<HomePage />}></Route>
                    <Route path='/register' element={<HomePage />}></Route>
                    <Route path='/cart' element={<Cart />}></Route>
                    <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />}></Route>
                    <Route path='/products/:productId' element={<ProductDetails />}></Route>
                    <Route path='/checkout' element={<Checkout />}></Route>
                    <Route path='/account/order' element={<Order />}></Route>
                    <Route path='/account/order/:orderId' element={<OrderDetails />}></Route>
                    <Route path='/payament/:orderId' element={<OrderDetails />}></Route>
                </Routes>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default CustomerRoutes;