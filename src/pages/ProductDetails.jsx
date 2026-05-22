import {
  Heart,
  ShoppingBag,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API, { getImageUrl } from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] =
    useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await API.get(
          `/products/${id}`
        );

        setProduct(response.data.product);

        setSelectedImage(
          response.data.product.images[0]
        );
        setSelectedSize(response.data.product.size?.[0] || "");
        setSelectedColor(response.data.product.colors?.[0] || "");

      } catch (error) {

        console.log(error);
      }
    };

    fetchProduct();

  }, [id]);

  // Loading
  if (!product) {

    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  const addToCart = async () => {
    try {
      await API.post("/cart/add", {
        productId: product._id,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });

      toast.success("Added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login to add cart");
    }
  };

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist/add", {
        productId: product._id,
      });

      toast.success("Saved to wishlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login to save wishlist");
    }
  };

  return (
    <div>
      <Navbar />
    <div className="px-6 md:px-10 py-14">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

        {/* LEFT SIDE IMAGES */}
        <div>

          {/* Main Image */}
          <div className="overflow-hidden rounded-md">

            <img
              src={getImageUrl(selectedImage)}
              alt={product.name}
              className="w-full h-[700px] object-cover"
            />

          </div>

          {/* Small Gallery */}
          <div className="flex gap-4 mt-4 flex-wrap">

            {product.images.map(
              (image, index) => (

                <img
                  key={index}
                  src={getImageUrl(image)}
                  alt="Product"
                  onClick={() =>
                    setSelectedImage(image)
                  }
                  className="w-24 h-24 object-cover rounded-md cursor-pointer border hover:border-black"
                />

              )
            )}

          </div>
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="flex flex-col justify-center">

          {/* Category */}
          <p className="uppercase tracking-[4px] text-sm text-gray-500">

            {product.category}

          </p>

          {/* Product Name */}
          <h1 className="text-5xl font-light mt-4">

            {product.name}

          </h1>

          {/* Price */}
          <div className="flex items-center gap-4 mt-6">

            <p className="text-3xl font-medium">

              ₹
              {product.discountPrice > 0
                ? product.discountPrice
                : product.price}

            </p>

            {product.discountPrice > 0 && (

              <p className="text-gray-400 line-through text-xl">

                ₹{product.price}

              </p>

            )}

          </div>

          {/* Description */}
          <p className="text-gray-600 mt-8 leading-8">

            {product.description}

          </p>

          {/* Sizes */}
          <div className="mt-10">

            <h3 className="uppercase text-sm tracking-[3px] mb-4">

              Select Size

            </h3>

            <div className="flex gap-4 flex-wrap">

              {product.size?.map(
                (item, index) => (

                  <button
                    key={index}
                    onClick={() => setSelectedSize(item)}
                    className={`border px-5 py-3 transition ${selectedSize === item ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
                  >

                    {item}

                  </button>

                )
              )}

            </div>
          </div>

          {product.colors?.length > 0 && (
            <div className="mt-10">
              <h3 className="uppercase text-sm tracking-[3px] mb-4">
                Select Color
              </h3>

              <div className="flex gap-4 flex-wrap">
                {product.colors.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(item)}
                    className={`border px-5 py-3 transition ${selectedColor === item ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h3 className="uppercase text-sm tracking-[3px] mb-4">
              Quantity
            </h3>
            <div className="flex w-fit items-center border">
              <button
                onClick={() => setQuantity((value) => Math.max(value - 1, 1))}
                className="px-5 py-3"
              >
                -
              </button>
              <span className="min-w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((value) => value + 1)}
                className="px-5 py-3"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-12">

            {/* Add To Cart */}
            <button
              onClick={addToCart}
              className="flex items-center justify-center gap-3 bg-black text-white px-10 py-4 uppercase tracking-[3px] hover:bg-gray-900 transition"
            >

              <ShoppingBag size={18} />

              Add To Cart

            </button>

            {/* Wishlist */}
            <button
              onClick={addToWishlist}
              className="border px-5 py-4 hover:bg-black hover:text-white transition"
            >

              <Heart size={20} />

            </button>

          </div>

        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
