/* eslint-disable react-hooks/set-state-in-effect */
import { Package, Plus, Trash2, Users, Wand2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import API, { getImageUrl } from "../services/api";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  category: "clothing",
  gender: "unisex",
  size: "XS,S,M,L,XL",
  colors: "Black,White",
  stock: "",
  imageUrls: "",
  isFeatured: false,
  isNewArrival: true,
};

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    try {
      const [productsResponse, statsResponse] = await Promise.all([
        API.get("/products"),
        API.get("/products/admin/stats"),
      ]);

      setProducts(productsResponse.data.products || []);
      setStats(statsResponse.data.stats);
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin data not loaded");
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const totalStock = useMemo(
    () => products.reduce((total, product) => total + (Number(product.stock) || 0), 0),
    [products],
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await API.post("/products/add", {
        ...form,
        price: Number(form.price),
        discountPrice: Number(form.discountPrice) || 0,
        stock: Number(form.stock) || 0,
      });

      toast.success("Product added");
      setForm(emptyForm);
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Product not added");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchAdminData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <Navbar />

      <main className="px-6 py-12 md:px-10">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-gray-500">Admin</p>
            <h1 className="mt-4 text-5xl font-light">Dashboard</h1>
          </div>
          <p className="max-w-xl text-gray-600">
            Add new men, women, and clothing products, manage inventory, and control storefront sections.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <div className="border p-6">
            <Package size={24} />
            <p className="mt-5 text-sm uppercase tracking-[3px] text-gray-500">Products</p>
            <h2 className="mt-2 text-3xl font-light">{stats?.totalProducts || 0}</h2>
          </div>
          <div className="border p-6">
            <Users size={24} />
            <p className="mt-5 text-sm uppercase tracking-[3px] text-gray-500">Men</p>
            <h2 className="mt-2 text-3xl font-light">{stats?.menProducts || 0}</h2>
          </div>
          <div className="border p-6">
            <Users size={24} />
            <p className="mt-5 text-sm uppercase tracking-[3px] text-gray-500">Women</p>
            <h2 className="mt-2 text-3xl font-light">{stats?.womenProducts || 0}</h2>
          </div>
          <div className="border p-6">
            <Wand2 size={24} />
            <p className="mt-5 text-sm uppercase tracking-[3px] text-gray-500">Stock</p>
            <h2 className="mt-2 text-3xl font-light">{totalStock}</h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="border p-6 lg:col-span-1">
            <h2 className="mb-6 text-2xl font-light">Add Product</h2>

            <div className="flex flex-col gap-4">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Product name" className="border px-4 py-3 outline-none" />
              <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Description" rows="4" className="border px-4 py-3 outline-none" />
              <input name="price" value={form.price} onChange={handleChange} required type="number" placeholder="Price" className="border px-4 py-3 outline-none" />
              <input name="discountPrice" value={form.discountPrice} onChange={handleChange} type="number" placeholder="Discount price" className="border px-4 py-3 outline-none" />
              <select name="gender" value={form.gender} onChange={handleChange} className="border px-4 py-3 outline-none">
                <option value="unisex">Unisex</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
              <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border px-4 py-3 outline-none" />
              <input name="size" value={form.size} onChange={handleChange} placeholder="Sizes comma separated" className="border px-4 py-3 outline-none" />
              <input name="colors" value={form.colors} onChange={handleChange} placeholder="Colors comma separated" className="border px-4 py-3 outline-none" />
              <input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="Stock" className="border px-4 py-3 outline-none" />
              <textarea name="imageUrls" value={form.imageUrls} onChange={handleChange} placeholder="Image URLs comma separated" rows="3" className="border px-4 py-3 outline-none" />

              <label className="flex items-center gap-3">
                <input name="isFeatured" type="checkbox" checked={form.isFeatured} onChange={handleChange} />
                Featured product
              </label>
              <label className="flex items-center gap-3">
                <input name="isNewArrival" type="checkbox" checked={form.isNewArrival} onChange={handleChange} />
                New arrival
              </label>

              <button disabled={loading} className="flex items-center justify-center gap-3 bg-black py-4 text-white uppercase tracking-[3px] transition hover:bg-gray-900">
                <Plus size={18} />
                {loading ? "Saving..." : "Add Product"}
              </button>
            </div>
          </form>

          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-light">Products</h2>
            <div className="overflow-x-auto border">
              <table className="w-full min-w-[760px] text-left">
                <thead className="border-b bg-[#f8f8f8] text-sm uppercase tracking-[2px] text-gray-500">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Gender</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Section</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <img src={getImageUrl(product.images?.[0])} alt={product.name} className="h-16 w-12 object-cover" />
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 capitalize">{product.gender}</td>
                      <td className="p-4">₹ {product.discountPrice > 0 ? product.discountPrice : product.price}</td>
                      <td className="p-4">{product.stock || 0}</td>
                      <td className="p-4">{product.isFeatured ? "Featured" : product.isNewArrival ? "New" : "Catalog"}</td>
                      <td className="p-4">
                        <button onClick={() => deleteProduct(product._id)} className="border p-3 transition hover:bg-red-500 hover:text-white" aria-label="Delete product">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
