import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    const timer = setTimeout(() => navigate("/login"), 800);
    return () => clearTimeout(timer);
  }, [logout, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f8f8] px-6">
      <div className="text-center">
        <LogOut size={42} className="mx-auto" />
        <h1 className="mt-6 text-4xl font-light">Logged out</h1>
        <p className="mt-3 text-gray-500">Your session has been cleared.</p>
      </div>
    </div>
  );
}
