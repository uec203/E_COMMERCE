import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OrderCard from "./OrderCard";
import { getOrdersByUser } from "../../../State/Order/Action";

const OrderStatus = [
  { label: "On The Way", value: "on_the_way" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const orders = useSelector((store) => store.order.orders);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      dispatch(getOrdersByUser());
    }
  }, [auth.user, auth?.user?.jwt, dispatch]);

  return (
    <div className="px-5 lg:px-20">
      <div className="grid grid-cols-12 gap-4">
        {/* Filter Section */}
        <div className="col-span-12 lg:col-span-3">
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5 text-left">
            <h1 className="text-lg font-bold">Filter</h1>

            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>

              {OrderStatus.map((item) => (
                <div key={item.value} className="flex items-center">
                  <input
                    id={item.value}
                    value={item.value}
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={item.value}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="col-span-12 lg:col-span-9">
          <div className="space-y-5">
            <h1>{orders?.length || 0} Orders</h1>
            {orders?.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

