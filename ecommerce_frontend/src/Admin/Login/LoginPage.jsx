import React, { Component, useEffect } from 'react';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getUser } from '../../State/Auth/Action';
import { Route,Routes } from 'react-router-dom';
import Admin from '../Admin';
import CreateProductForm from '../Components/CreateProductForm';
import ProductTable from '../Components/ProductTable';
import OrderTable from '../Components/OrderTable';
import CustomerTable from '../Components/CustomerTable';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);

    useEffect(() => {
        if (auth.jwt) {
          dispatch(getUser(auth.jwt));
          console.log(auth.user);
        }
      }, [auth.jwt]);
    
      useEffect(() => {
        console.log("user change");
        if (auth.user?.role==="ADMIN") {
          navigate("/admin/panel")
        }
        
      }, [auth.user]);

        return (
            <div className='flex justify-center items-center h-screen'>
                
                <Routes>
                <Route path='/panel' element={<Admin user={auth.user}/>}></Route>
                <Route path='/product/create' element={<CreateProductForm />} />
                <Route path='/products' element={<ProductTable />} />
                <Route path='/orders' element={<OrderTable />} />
                <Route path='/customers' element={<CustomerTable />} />
                <Route path='/' element={<LoginForm/>} />
                </Routes>
            </div>
            
        );
}

export default LoginPage;