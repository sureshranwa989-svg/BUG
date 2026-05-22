import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "./ProductCard";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products", {
          params: { newArrival: true },
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
    <div className="bg-[#f8f8f8] px-6 py-24 md:px-10">
      <div className="mb-14 text-center">
        <p className="text-sm uppercase tracking-[4px] text-gray-500">
          Just Dropped
        </p>
        <h2 className="mt-4 text-5xl font-light">New Arrivals</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/new"
          className="inline-block border border-black px-8 py-3 text-sm uppercase tracking-[3px] transition hover:bg-black hover:text-white"
        >
          Shop New
        </Link>
      </div>
    </div>
  );
}
