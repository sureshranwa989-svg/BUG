import { Mail, Lock } from "lucide-react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import API from "../services/api"
import toast from "react-hot-toast"

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const[loading, setLoading] = useState(false);

  //handle InputChange
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);

      const response = await API.post("/users/login", formData)
      //Save Auth
      login(
        response.data.user,
        response.data.token
      );
      toast.success("Login successful");
      navigate("/")
    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-[#f8f8f8]">

      <div className="w-full max-w-md bg-white p-10 rounded-md shadow-sm">

        {/* Heading */}
        <div className="text-center mb-10">

          <p className="uppercase tracking-[4px] text-sm text-gray-500">
            Welcome Back
          </p>

          <h1 className="text-4xl font-light mt-4">
            Login
          </h1>

        </div>

        {/* Form */}
        <form
        onSubmit={handleSubmit}
         className="flex flex-col gap-6">

          {/* Email */}
          <div>

            <label className="text-sm uppercase tracking-[2px]">
              Email
            </label>

            <div className="flex items-center border mt-2 px-4 py-3 rounded-md">

              <Mail size={18} className="text-gray-500" />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className="w-full outline-none ml-3"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                className="w-full outline-none ml-3"
              />

            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">

            <button
              type="button"
              className="text-sm text-gray-500 hover:text-black transition"
            >
              Forgot Password?
            </button>

          </div>

          {/* Button */}
          <button 
          type="submit"
          disabled={loading}
          className="bg-black text-white py-4 uppercase tracking-[3px] hover:bg-gray-900 transition">

           {loading ? "Loading..." : "Login"}

          </button>

        </form>

        {/* Bottom */}
        <p className="text-center text-gray-500 text-sm mt-8">

          Don’t have an account?{" "}

          <Link to="/register" className="text-black cursor-pointer">
            Register
          </Link>

        </p>

      </div>
    </div>
  );
}
