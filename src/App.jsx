import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/WishList";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import ProductListing from "./pages/ProductListing";
import Logout from "./pages/Logout";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from"./components/ProtectedRoute"




function App() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/search" element={<ProductListing type="products" />} />
      <Route path="/new" element={<ProductListing type="new" />} />
      <Route path="/men" element={<ProductListing type="men" />} />
      <Route path="/women" element={<ProductListing type="women" />} />
      <Route path="/clothing" element={<ProductListing type="clothing" />} />
      <Route path="/product/:id" element={<ProductDetails/>} />
      <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
      <Route path='/wishlist' element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
      <Route path='/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      <Route path='/admin' element={<ProtectedRoute adminOnly><AdminDashboard/></ProtectedRoute>} />

    </Routes>

  );

}

export default App;
