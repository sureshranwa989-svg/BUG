import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products", {
          params: { featured: true },
        });
        setProducts(response.data.products || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="px-6 py-20 md:px-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[4px] text-gray-500">
            Trending Now
          </p>
          <h2 className="mt-2 text-4xl font-light">Featured Products</h2>
        </div>

        <Link
          to="/products"
          className="border border-black px-6 py-2 text-sm uppercase tracking-[3px] transition hover:bg-black hover:text-white"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
