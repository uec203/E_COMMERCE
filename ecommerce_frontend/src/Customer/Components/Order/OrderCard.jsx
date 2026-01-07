import { Avatar, AvatarGroup} from '@mui/material';
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();
    console.log(order);

    return (
        <div
            onClick={() => navigate(`/account/order/${order.id}`)}
            className="p-5 border shadow-md shadow-black hover:shadow-2xl cursor-pointer"
        >
            <div className="grid grid-cols-12 gap-4 items-center">
                
                {/* Left Section */}
                <div className="col-span-6">
                    <div className="flex">
                        <AvatarGroup max={2} sx={{ justifyContent: "flex-start" }}>
                            {order.orderItems?.map((orderItem) => (
                                <Avatar
                                    key={orderItem.product.id}
                                    src={orderItem.product.imageUrl}
                                />
                            ))}
                        </AvatarGroup>

                        <div className="ml-5 space-y-2">
                            <p className="opacity-50 text-xs font-semibold">
                                Order Created In: {order.createdAt}
                            </p>
                            <p className="opacity-50 text-xs font-semibold">
                                Total Number of items: {order.totalItems}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Price Section */}
                <div className="col-span-3">
                    <p className="opacity-50 text-xs font-semibold">
                        Total Price: ₹{order.totalPrice}
                    </p>
                    <p className="opacity-50 text-xs font-semibold">
                        Order Discount: ₹{order.discount}
                    </p>
                    <p className="font-semibold">
                        Final Price: ₹{order.totalDiscountPrice}
                    </p>
                </div>

                {/* Status Section */}
                <div className="col-span-3">
                    <div className="flex items-center">
                        <AdjustIcon
                            className="mr-2 text-green-600"
                            sx={{ width: 15, height: 15 }}
                        />
                        <span className="font-semibold text-sm">
                            {order.orderStatus}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
