import {
  Mail,
  Lock,
  User,
} from "lucide-react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Handle Register
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await API.post(
        "/users/register",
        formData
      );

      toast.success(
        response.data.message ||
        "Registration successful"
      );

      // Redirect To Login
      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-[#f8f8f8]">

      <div className="w-full max-w-md bg-white p-10 rounded-md shadow-sm">

        {/* Heading */}
        <div className="text-center mb-10">

          <p className="uppercase tracking-[4px] text-sm text-gray-500">
            Create Account
          </p>

          <h1 className="text-4xl font-light mt-4">
            Register
          </h1>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >

          {/* Username */}
          <div>

            <label className="text-sm uppercase tracking-[2px]">
              Username
            </label>

            <div className="flex items-center border mt-2 px-4 py-3 rounded-md">

              <User size={18} className="text-gray-500" />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full outline-none ml-3"
              />

            </div>
          </div>

          {/* Email */}
          <div>

            <label className="text-sm uppercase tracking-[2px]">
              Email
            </label>

            <div className="flex items-center border mt-2 px-4 py-3 rounded-md">

              <Mail size={18} className="text-gray-500" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full outline-none ml-3"
              />

            </div>
          </div>

          {/* Phone */}
          <div>

            <label className="text-sm uppercase tracking-[2px]">
              Phone
            </label>

            <div className="flex items-center border mt-2 px-4 py-3 rounded-md">

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full outline-none"
              />

            </div>
          </div>

          {/* Password */}
          <div>

            <label className="text-sm uppercase tracking-[2px]">
              Password
            </label>

            <div className="flex items-center border mt-2 px-4 py-3 rounded-md">

              <Lock size={18} className="text-gray-500" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full outline-none ml-3"
                autoComplete="current-password"
              />

            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-4 uppercase tracking-[3px] hover:bg-gray-900 transition disabled:opacity-50"
          >

            {loading
              ? "Loading..."
              : "Create Account"}

          </button>

        </form>

      </div>
    </div>
  );
}