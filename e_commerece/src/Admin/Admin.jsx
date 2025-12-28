import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashBoard from './Components/DashBoard';
import CreateProductForm from './Components/CreateProductForm';
import ProductTable from './Components/ProductTable';
import OrderTable from './Components/OrderTable';
import CustomerTable from './Components/CustomerTable';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { logout } from '../State/Auth/Action';
import { useDispatch, useSelector } from 'react-redux';

const menu = [
    { name: "Dashboard", path: "/admin/panel", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <ShoppingBagIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <AccountBoxIcon /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCartIcon /> },
    { name: "AddProduct", path: "/admin/product/create", icon: <AddIcon /> },
]

const Admin = ({ user }) => {
    const theme = useTheme();
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const navigate = useNavigate();
    const [openAuthModel, setOpenAuthModel] = useState(false);
    const dispatch = useDispatch();
    const userLogout = useSelector(store => store.auth.jwt);

    useEffect(() => {
        if (!userLogout)
            navigate("/admin/login");
    }, [userLogout]);
    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
            }}
        >
            <>
                <List>
                    {
                        menu.map((item, index) => <ListItem key={item.name} disablePadding >
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    {item.name}
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>)
                    }
                </List>
            </>
            <List>
                {
                    <ListItem disablePadding >
                        <ListItemButton onClick={() => dispatch(logout())}>
                            <ListItemIcon >
                                <Avatar
                                    className="text-white"
                                    sx={{
                                        bgcolor: deepPurple[500],
                                        color: "white",
                                        cursor: "pointer"
                                    }}
                                >
                                    {user?.firstName[0].toUpperCase()}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />

                        </ListItemButton>
                    </ListItem>
                }
            </List>
        </Box>
    )

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <CssBaseline />

            {/* Sidebar */}
            <aside className="w-[240px] border-r border-gray-300 h-full flex-shrink-0">
                {drawer}
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto bg-gray-50 p-4">
                <Routes>
                    <Route path="/panel" element={<DashBoard />} />
                    <Route path="/product/create" element={<CreateProductForm />} />
                    <Route path="/products" element={<ProductTable />} />
                    <Route path="/orders" element={<OrderTable />} />
                    <Route path="/customers" element={<CustomerTable />} />
                </Routes>
            </main>
        </div>

    );
}

export default Admin;