import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import API from "../services/api";

const pageCopy = {
  men: ["Men", "Sharp everyday clothing, outerwear, and street essentials."],
  women: ["Women", "Modern silhouettes, clean layers, and new-season favorites."],
  clothing: ["Clothing", "Complete wardrobe pieces across men, women, and unisex fits."],
  new: ["New Arrivals", "Fresh drops from the latest collection."],
  products: ["All Products", "Shop the full BUG collection."],
};

export default function ProductListing({ type = "products" }) {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("new");
  const query = searchParams.get("q") || "";

  const activeType = params.type || type;
  const [title, subtitle] = pageCopy[activeType] || pageCopy.products;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const requestParams = {};

        if (activeType === "men" || activeType === "women") requestParams.gender = activeType;
        if (activeType === "new") requestParams.newArrival = true;
        if (activeType === "clothing") requestParams.category = "clothing";
        if (query) requestParams.search = query;

        const response = await API.get("/products", { params: requestParams });
        setProducts(response.data.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeType, query]);

  const visibleProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const aPrice = a.discountPrice > 0 ? a.discountPrice : a.price;
      const bPrice = b.discountPrice > 0 ? b.discountPrice : b.price;

      if (sort === "low") return aPrice - bPrice;
      if (sort === "high") return bPrice - aPrice;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [products, sort]);

  return (
    <div>
      <Navbar />

      <main className="px-6 py-12 md:px-10">
        <div className="flex flex-col gap-8 border-b pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-gray-500">
              {query ? `Search: ${query}` : "BUG Collection"}
            </p>
            <h1 className="mt-4 text-5xl font-light">{title}</h1>
            <p className="mt-4 max-w-2xl text-gray-600">{subtitle}</p>
          </div>

          <label className="flex w-full items-center gap-3 border px-4 py-3 lg:w-64">
            <SlidersHorizontal size={18} />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-full outline-none"
            >
              <option value="new">Newest</option>
              <option value="low">Price low to high</option>
              <option value="high">Price high to low</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="py-20 text-center text-2xl font-light">Loading products...</div>
        ) : visibleProducts.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-3xl font-light">No products found</h2>
            <p className="mt-3 text-gray-500">Add products from the admin dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
