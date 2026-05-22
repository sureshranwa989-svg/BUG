import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "COD",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await API.get("/cart");
        setCartItems(response.data.cart || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCart();
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => {
      const price = item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price;
      return total + price * item.quantity;
    }, 0),
    [cartItems],
  );

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const createOrderPayload = () => ({
        address: `${form.firstName} ${form.lastName}, ${form.address}, ${form.city}, ${form.postalCode}`,
        phone: form.phone,
        paymentMethod: form.paymentMethod,
  });

  const placeFinalOrder = async () => {
    await API.post("/orders/place", createOrderPayload());
  };

  const openRazorpayCheckout = async () => {
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Razorpay could not be loaded");
      return;
    }

    const response = await API.post("/payment/create-order", {
      amount: subtotal,
    });

    const { order, key } = response.data;

    if (!key) {
      toast.error("Razorpay key is missing");
      return;
    }

    const razorpay = new window.Razorpay({
      key,
      amount: order.amount,
      currency: order.currency,
      name: "BUG",
      description: "Fashion order payment",
      order_id: order.id,
      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#111111",
      },
      handler: async () => {
        try {
          await placeFinalOrder();
          toast.success("Payment successful. Order placed");
          navigate("/orders");
        } catch (error) {
          toast.error(error.response?.data?.message || "Payment done, order save failed");
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          toast.error("Payment cancelled");
        },
      },
    });

    razorpay.open();
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      if (form.paymentMethod === "Razorpay") {
        await openRazorpayCheckout();
        return;
      }

      await placeFinalOrder();

      toast.success("Order placed");
      navigate("/orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Order failed");
    } finally {
      if (form.paymentMethod !== "Razorpay") {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Navbar />

      <form onSubmit={placeOrder} className="px-6 py-16 md:px-10">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-[4px] text-gray-500">
            Secure Payment
          </p>
          <h1 className="mt-4 text-5xl font-light">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-8 text-2xl font-light">Shipping Details</h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                ["firstName", "First Name", "text"],
                ["lastName", "Last Name", "text"],
                ["email", "Email Address", "email"],
                ["phone", "Phone Number", "text"],
                ["address", "Address", "text"],
                ["city", "City", "text"],
                ["postalCode", "Postal Code", "text"],
              ].map(([name, placeholder, type]) => (
                <input
                  key={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  type={type}
                  required
                  placeholder={placeholder}
                  className={`border px-5 py-4 outline-none ${["email", "phone", "address"].includes(name) ? "md:col-span-2" : ""}`}
                />
              ))}
            </div>

            <div className="mt-14">
              <h2 className="mb-8 text-2xl font-light">Payment Method</h2>
              <div className="flex flex-col gap-4">
                {["Razorpay", "COD"].map((method) => (
                  <label key={method} className="flex cursor-pointer items-center gap-4 border px-5 py-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={form.paymentMethod === method}
                      onChange={handleChange}
                    />
                    {method === "COD" ? "Cash On Delivery" : method}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="h-fit rounded-md border p-8">
            <h2 className="mb-8 text-2xl font-light">Order Summary</h2>

            <div className="mb-6 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between gap-4 text-sm">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>₹ {(item.product.discountPrice > 0 ? item.product.discountPrice : item.product.price) * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mb-5 flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>
            <div className="mb-8 flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t pt-5 text-xl">
              <span>Total</span>
              <span>₹ {subtotal}</span>
            </div>

            <button disabled={loading} className="mt-10 w-full bg-black py-4 text-white uppercase tracking-[3px] transition hover:bg-gray-900">
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
}
