import React, { useEffect, useMemo } from "react";
import AddressCard from "../AddressCard/AddressCard";
import { Avatar, AvatarGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import AdjustIcon from '@mui/icons-material/Adjust';

const OrderDetails = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const order = useSelector((store) => store.order.order);

    useEffect(() => {
        console.log("Fetching order details for orderId:", orderId);
        dispatch(getOrderById(orderId));
    }, [dispatch, orderId]);



    return (
        <div className="px-5 lg:px-20 space-y-10">

            {/* Delivery Address */}
            {order?.shippingAddress && (
                <div>
                    <h1 className="text-lg font-bold py-4">Delivery Address</h1>
                    <AddressCard address={order.shippingAddress} />
                </div>
            )}


            {/* Order Card */}
            <div className="bg-white shadow-xl rounded-lg border p-6">

                {/* Top Section: Avatars + Info + Price + Status */}
                <div className="grid grid-cols-12 gap-4 items-center">

                    {/* Left Section: Avatars + Order Info */}
                    <div className="col-span-12 md:col-span-4 flex items-center gap-4">
                        <AvatarGroup max={2} sx={{ justifyContent: "flex-start" }}>
                            {order?.orderItems?.map((item) => (
                                <Avatar
                                    key={item.product.id}
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    sx={{ width: 40, height: 40 }}
                                />
                            ))}
                        </AvatarGroup>

                        <div className="space-y-1">
                            {order?.createdAt && (
                                <p className="text-xs text-gray-500 font-semibold">
                                    Order Created: {order.createdAt}
                                </p>
                            )}
                            {order?.totalItems != null && (
                                <p className="text-xs text-gray-500 font-semibold">
                                    Total Items: {order.totalItems}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="col-span-12 md:col-span-4 space-y-1 mt-4 md:mt-0">
                        {order?.totalPrice != null && (
                            <p className="text-xs text-gray-500 font-semibold">
                                Total Price: ₹{order.totalPrice}
                            </p>
                        )}
                        {order?.discount != null && (
                            <p className="text-xs text-gray-500 font-semibold">
                                Order Discount: ₹{order.discount}
                            </p>
                        )}
                        {order?.totalDiscountPrice != null && (
                            <p className="font-semibold">
                                Final Price: ₹{order.totalDiscountPrice}
                            </p>
                        )}
                    </div>

                    {/* Status Section */}
                    <div className="col-span-12 md:col-span-4 mt-4 md:mt-0 flex items-center justify-center">
                        <div className="flex items-center">
                            <AdjustIcon
                                className="mr-2 text-green-600"
                                sx={{ width: 15, height: 15 }}
                            />
                            <span className="font-semibold text-sm">
                                {order?.orderStatus}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Ordered Items */}
                <div className="mt-6">
                    <h2 className="text-sm font-semibold mb-2">Ordered Items:</h2>
                    <div className="flex flex-wrap gap-4">
                        {order?.orderItems?.map((item) => (
                            <div
                                key={item.product.id}
                                className="flex items-center gap-2 border rounded p-2"
                            >
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div className="text-sm">
                                    <p className="font-medium">{item.product.name}</p>
                                    <p className="text-gray-500">Qty: {item.quantity}</p>
                                    <p className="text-gray-500">Price: ₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderDetails;