/* eslint-disable react-hooks/set-state-in-effect */
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import API, { getImageUrl } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const response = await API.get("/cart");

      setCartItems(response.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Increase Quantity
  const increaseQuantity = async (item) => {
    try {
      await API.put(`/cart/${item._id}`, {
        quantity: item.quantity + 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Decrease Quantity
  const decreaseQuantity = async (item) => {
    if (item.quantity <= 1) return;

    try {
      await API.put(`/cart/${item._id}`, {
        quantity: item.quantity - 1,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Item
  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => {
      const price = item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price;
      return acc + price * item.quantity;
    },
    0,
  );

  return (
    <div>
    <Navbar />
    <div className="px-6 md:px-10 py-16">
      {/* Heading */}
      <div className="mb-12">
        <p className="uppercase tracking-[4px] text-sm text-gray-500">
          Your Bag
        </p>

        <h1 className="text-5xl font-light mt-4">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {cartItems.length === 0 ? (
            <h2 className="text-2xl">Cart is empty</h2>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row gap-6 border-b pb-8"
              >
                {/* Image */}
                <img
                  src={getImageUrl(item.product.images?.[0])}
                  alt={item.product.name}
                  className="w-full md:w-44 h-52 object-cover rounded-md"
                />

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-light">{item.product.name}</h2>

                    <p className="text-gray-500 mt-2">
                      ₹ {item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price}
                    </p>
                    <p className="mt-2 text-sm uppercase tracking-[2px] text-gray-400">
                      {item.size && `Size: ${item.size}`} {item.color && ` / Color: ${item.color}`}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="border px-4 py-2"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item)}
                      className="border px-4 py-2"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="self-start hover:text-red-500 transition"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div className="border p-8 h-fit rounded-md">
          <h2 className="text-2xl font-light mb-8">Order Summary</h2>

          <div className="flex justify-between mb-5 text-gray-600">
            <span>Subtotal</span>

            <span>₹ {subtotal}</span>
          </div>

          <div className="flex justify-between mb-8 text-gray-600">
            <span>Shipping</span>

            <span>Free</span>
          </div>

          <div className="flex justify-between text-xl border-t pt-5">
            <span>Total</span>

            <span>₹ {subtotal}</span>
          </div>

          <Link
            to="/checkout"
            className="block w-full bg-black text-center text-white py-4 mt-10 uppercase tracking-[3px] hover:bg-gray-900 transition"
          >
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
