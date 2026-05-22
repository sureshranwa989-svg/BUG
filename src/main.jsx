import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { WishListProvider } from "./context/wishListContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WishListProvider>
          <App />
          <Toaster position="top-right" />
        </WishListProvider>
        
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
