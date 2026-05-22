import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API, { getImageUrl } from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders");
        setOrders(response.data.orders || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="px-6 py-16 md:px-10">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-[4px] text-gray-500">
            Purchase History
          </p>
          <h1 className="mt-4 text-5xl font-light">My Orders</h1>
        </div>

        <div className="flex flex-col gap-8">
          {orders.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-3xl font-light">No orders yet</h2>
              <p className="mt-3 text-gray-500">Your completed checkout orders will show here.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="rounded-md border p-6">
                <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-light">Order #{order._id.slice(-8).toUpperCase()}</h2>
                    <p className="mt-2 text-gray-500">
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="w-fit border px-4 py-2 text-sm uppercase tracking-[2px]">
                    {order.orderStatus}
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-5">
                  {order.products.map((item) => (
                    <div key={`${order._id}-${item.product?._id}`} className="flex items-center gap-5">
                      <img src={getImageUrl(item.product?.images?.[0])} alt={item.product?.name} className="h-28 w-24 object-cover" />
                      <div className="flex-1">
                        <h3 className="text-xl font-light">{item.product?.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Qty {item.quantity} {item.size && `/ Size ${item.size}`} {item.color && `/ ${item.color}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end text-xl">
                  ₹ {order.totalPrice}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
