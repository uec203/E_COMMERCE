import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Admin from '../Admin/Admin';
import LoginForm from '../Customer/Auth/LoginForm';
import LoginPage from '../Admin/Login/LoginPage';



const AdminRoutes = () => {
    return (
        <div>
            <Routes>
                    <Route path='/login' element={<LoginPage/>} ></Route>
                    <Route path='/*' element={<Admin/>} ></Route>
            </Routes>
        </div>
    );
}

export default AdminRoutes;