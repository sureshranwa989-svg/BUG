import { useState } from "react";

import { Link } from "react-router-dom";

import SearchModel from "./SearchModel";

import { useWishList } from "../context/wishListContext";

import {
  Search,
  User,
  ShoppingCart,
  Heart,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);

  const { user, token } = useAuth();

  const { wishList } = useWishList();

  return (
    <div className="w-full border-b">
      {/* Main Navbar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>

          {/* Logo */}
          <Link to="/">
            <h1 className="text-4xl md:text-6xl font-serif tracking-wide cursor-pointer">
              BUG
            </h1>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-16 text-sm uppercase tracking-[2px]">
          <Link to="/" className="hover:text-gray-500 transition">
            Home
          </Link>

          <Link to="/new" className="hover:text-gray-500 transition">
            New
          </Link>

          <Link to="/men" className="hover:text-gray-500 transition">
            Men
          </Link>

          <Link to="/women" className="hover:text-gray-500 transition">
            Women
          </Link>

          <Link to="/clothing" className="hover:text-gray-500 transition">
            Clothing
          </Link>

          <Link to="/products" className="hover:text-gray-500 transition">
            Products
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-5 md:gap-8">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hover:text-gray-500 transition"
          >
            <Search size={22} />
          </button>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative hover:text-gray-500 transition"
          >
            <Heart size={22} />

            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 rounded-full">
              {wishList.length}
            </span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative hover:text-gray-500 transition">
            <ShoppingCart size={22} />

            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-1.5 rounded-full">
              0
            </span>
          </Link>

          {/* Profile */}
          <Link to="/profile" className="hover:text-gray-500 transition">
            <User size={22} />
          </Link>

          {/* Admin */}
          {user?.role === "admin" && (
            <Link to="/admin" className="hover:text-gray-500 transition">
              <LayoutDashboard size={22} />
            </Link>
          )}

          {/* Logout */}
          {token && (
            <Link to="/logout" className="hover:text-gray-500 transition">
              <LogOut size={22} />
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top */}
        <div className="flex items-center justify-between px-6 py-6 border-b">
          <h1 className="text-3xl font-serif">HYPE</h1>

          <button onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col p-6 gap-8 text-sm uppercase tracking-[2px]">
          <Link to="/">Home</Link>

          <Link to="/new">New</Link>

          <Link to="/men">Men</Link>

          <Link to="/women">Women</Link>

          <Link to="/clothing">Clothing</Link>

          <Link to="/products">Products</Link>

          <Link to="/wishlist">Wishlist</Link>

          <Link to="/orders">Orders</Link>

          <Link to="/profile">Profile</Link>

          {user?.role === "admin" && <Link to="/admin">Admin</Link>}

          <Link to={token ? "/logout" : "/login"}>
            {token ? "Logout" : "Login"}
          </Link>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Search Modal */}
      <SearchModel isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
