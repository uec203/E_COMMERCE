import React from 'react';
import AddressCard from '../AddressCard/AddressCard';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const DeliveryAddress = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const address = useSelector(store => store.auth.user);

const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const formDataObject = {};
    data.forEach((value, key) => {
        formDataObject[key] = value;
    });

    console.log("Form Data Object:", formDataObject);
    const address = {
        ...formDataObject,
       zipCode: formDataObject.zip 
    };

    // Construct orderData object
    const orderData = { address, navigate };

    // Dispatch the order creation action
    dispatch(createOrder(orderData));

    // Log submit action
    console.log("Form submitted with order data:", orderData);
};


    return (
        <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Side - Address Card */}
            <div className="lg:w-5/12 border rounded-r-md shadow-md h-[30rem] overflow-y-scroll">
                <div className="p-5 py-7 cursor-pointer border-b">
                    <AddressCard address={address} />
                    {address && <Button size="large" variant="contained" className="mt-2">
                        Deliver Here
                    </Button>}
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-7/12 border rounded-l-md shadow-md p-5">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            autoComplete="given-name"
                        />
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            autoComplete="given-name"
                        />
                    </div>

                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        multiline
                        rows={4}
                        autoComplete="street-address"
                    />

                    <div className="flex flex-col sm:flex-row gap-3">
                        <TextField
                            required
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            autoComplete="address-level2"
                        />
                        <TextField
                            required
                            id="state"
                            name="state"
                            label="State/Province/Region"
                            fullWidth
                            autoComplete="address-level1"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <TextField
                            required
                            id="zip"
                            name="zip"
                            label="Zip Code"
                            fullWidth
                            autoComplete="shipping postal-code"
                        />
                        <TextField
                            required
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number"
                            fullWidth
                            autoComplete="tel"
                        />
                    </div>

                    <Button
                        size="large"
                        variant="contained"
                        className="mt-2 py-3 px-6"
                        type="submit"
                    >
                        Deliver Here
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default DeliveryAddress;
