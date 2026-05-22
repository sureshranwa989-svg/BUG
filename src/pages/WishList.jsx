/* eslint-disable react-hooks/set-state-in-effect */
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishList } from "../context/wishListContext";
import { useEffect } from "react";
import toast from "react-hot-toast";

import API, { getImageUrl } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Wishlist() {
  

  

  useEffect(() => {
    fetchWishList();
  }, []);

  const {wishList, fetchWishList, removeFromWishList} = useWishList()

  // Add To Cart
  const addToCart = async (productId) => {
    try {
      await API.post("/cart/add", {
        productId,
        quantity: 1,
      });

      toast.success("Added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Cart not updated");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-10 py-16">
        {/* Heading */}
        <div className="mb-12">
          <p className="uppercase tracking-[4px] text-sm text-gray-500">
            Saved Products
          </p>

          <h1 className="text-5xl font-light mt-4">Wishlist</h1>
        </div>

        {wishList.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={60} className="mx-auto text-gray-300" />

            <h2 className="text-3xl mt-6 font-light">Your Wishlist is Empty</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishList.map((item) => (
              <div key={item._id} className="border rounded-md overflow-hidden">
                {/* Image */}
                <img
                  src={getImageUrl(item.product.images?.[0])}
                  alt={item.product.name}
                  className="w-full h-[420px] object-cover"
                />

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-light">{item.product.name}</h2>

                  <p className="text-gray-500 mt-2">₹{item.product.price}</p>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6">
                    {/* Add To Cart */}
                    <button
                      onClick={() => addToCart(item.product._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 uppercase tracking-[2px] hover:bg-gray-900 transition"
                    >
                      <ShoppingBag size={18} />
                      Add To Cart
                    </button>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromWishList(item._id)}
                      className="border px-4 hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
