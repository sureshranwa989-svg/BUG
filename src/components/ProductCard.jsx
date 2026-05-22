import { Heart, ShoppingBag } from "lucide-react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import API, {
  getImageUrl,
} from "../services/api";

import {
  useWishList,
} from "../context/wishListContext";

export default function ProductCard({
  product,
}) {

  const {
    addToWishList,
  } = useWishList();

  const price =
    product.discountPrice > 0
      ? product.discountPrice
      : product.price;

  const image =
    getImageUrl(
      product.images?.[0]
    );

  // Add To Cart
  const addToCart = async () => {

    try {

      await API.post(
        "/cart/add",
        {
          productId:
            product._id,

          quantity: 1,

          size:
            product.size?.[0],

          color:
            product.colors?.[0],
        }
      );

      toast.success(
        "Added to cart"
      );

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Login to add cart"
      );

    }
  };

  return (

    <div className="group">

      <Link
        to={`/product/${product._id}`}
        className="block overflow-hidden rounded-md bg-gray-100"
      >

        <img
          src={image}
          alt={product.name}
          className="h-[430px] w-full object-cover transition duration-500 group-hover:scale-105"
        />

      </Link>

      <div className="mt-4 flex items-start justify-between gap-4">

        <Link
          to={`/product/${product._id}`}
        >

          <h3 className="text-lg font-light">
            {product.name}
          </h3>

          <p className="mt-1 text-sm uppercase tracking-[2px] text-gray-500">

            {product.gender}
            {" / "}
            {product.category}

          </p>

          <div className="mt-2 flex items-center gap-3">

            <p>
              ₹ {price}
            </p>

            {product.discountPrice > 0 && (

              <p className="text-sm text-gray-400 line-through">

                ₹ {product.price}

              </p>

            )}

          </div>

        </Link>

        {/* Actions */}
        <div className="flex gap-2">

          {/* Wishlist */}
          <button
            onClick={() =>
              addToWishList(
                product._id
              )
            }
            className="border p-3 transition hover:bg-black hover:text-white"
            aria-label="Add to wishlist"
          >

            <Heart size={18} />

          </button>

          {/* Cart */}
          <button
            onClick={addToCart}
            className="bg-black p-3 text-white transition hover:bg-gray-800"
            aria-label="Add to cart"
          >

            <ShoppingBag size={18} />

          </button>

        </div>

      </div>

    </div>
  );
}