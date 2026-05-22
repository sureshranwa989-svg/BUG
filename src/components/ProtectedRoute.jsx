import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
    children,
    adminOnly = false,
}) {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;

    if (!token){
        return <Navigate to="/login"/>;
    }

    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="/"/>;
    }

    return children;
}
