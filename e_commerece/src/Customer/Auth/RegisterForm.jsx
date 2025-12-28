import { Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, getUser } from '../../State/Auth/Action';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userData = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
        };

        dispatch(register(userData));
        console.log(userData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Tailwind Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* First Name */}
                    <div>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete="given-name"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="family-name"
                        />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                        />
                    </div>

                    {/* Password */}
                    <div className="sm:col-span-2">
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="sm:col-span-2">
                        <Button
                            className="bg-[#9155FD] w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: ".8rem 0" }}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </form>

            {/* Login Redirect */}
            <div className="flex justify-center flex-col items-center">
                <div className="py-3 flex items-center">
                    <p>Already have an account?</p>
                    <Button
                        onClick={() => navigate("/login")}
                        className="ml-5"
                        size="small"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
