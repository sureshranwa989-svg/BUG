/* eslint-disable react-hooks/set-state-in-effect */
import { LayoutDashboard, LogOut, Package, Upload, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import API, { getImageUrl } from "../services/api";

export default function Profile() {
  const fileInputRef = useRef(null);
  const { user, updateUser } = useAuth();
  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileForm({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleProfileChange = (event) => {
    setProfileForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePasswordChange = (event) => {
    setPasswordForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const saveProfile = async (event) => {
    event.preventDefault();

    try {
      setSavingProfile(true);

      const formData = new FormData();
      formData.append("username", profileForm.username);
      formData.append("email", profileForm.email);
      formData.append("phone", profileForm.phone);

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await API.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      updateUser(response.data.user);
      toast.success("Profile updated");
      setProfileImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      setSavingProfile(false);
    }
  };

  const updatePassword = async (event) => {
    event.preventDefault();

    try {
      setSavingPassword(true);
      await API.put("/users/update-password", passwordForm);
      toast.success("Password updated");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    } finally {
      setSavingPassword(false);
    }
  };

  const imagePreview = profileImage
    ? URL.createObjectURL(profileImage)
    : getImageUrl(user?.profileImage);

  return (
    <div>
      <Navbar />

      <div className="px-6 py-16 md:px-10">
        <div className="mb-14">
          <p className="text-sm uppercase tracking-[4px] text-gray-500">
            Account Settings
          </p>
          <h1 className="mt-4 text-5xl font-light">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="h-fit rounded-md border p-8">
            <div className="flex flex-col items-center">
              <img
                src={imagePreview}
                alt={user?.username || "Profile"}
                className="h-40 w-40 rounded-full object-cover"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(event) => setProfileImage(event.target.files?.[0] || null)}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 flex items-center gap-2 border px-6 py-3 text-sm uppercase tracking-[2px] transition hover:bg-black hover:text-white"
              >
                <Upload size={16} />
                Upload Image
              </button>
            </div>

            <div className="mt-10 space-y-5 text-center">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <h2 className="mt-1 text-2xl font-light">{user?.username || "User"}</h2>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <h2 className="mt-1 text-lg">{user?.email}</h2>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <Link
                to="/orders"
                className="flex items-center justify-center gap-3 border px-5 py-3 uppercase tracking-[2px] transition hover:bg-black hover:text-white"
              >
                <Package size={18} />
                My Orders
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center justify-center gap-3 border px-5 py-3 uppercase tracking-[2px] transition hover:bg-black hover:text-white"
                >
                  <LayoutDashboard size={18} />
                  Admin Dashboard
                </Link>
              )}

              <Link
                to="/logout"
                className="flex items-center justify-center gap-3 bg-black px-5 py-3 text-white uppercase tracking-[2px] transition hover:bg-gray-900"
              >
                <LogOut size={18} />
                Logout
              </Link>
            </div>
          </div>

          <div className="rounded-md border p-8 lg:col-span-2">
            <form onSubmit={saveProfile}>
              <div className="mb-8 flex items-center gap-3">
                <User size={24} />
                <h2 className="text-3xl font-light">Update Profile</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  name="username"
                  value={profileForm.username}
                  onChange={handleProfileChange}
                  type="text"
                  placeholder="Full Name"
                  className="border px-5 py-4 outline-none"
                />

                <input
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  type="email"
                  placeholder="Email Address"
                  className="border px-5 py-4 outline-none"
                />

                <input
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  type="text"
                  placeholder="Phone Number"
                  className="border px-5 py-4 outline-none md:col-span-2"
                />
              </div>

              <button
                disabled={savingProfile}
                className="mt-8 bg-black px-8 py-4 text-white uppercase tracking-[3px] transition hover:bg-gray-900"
              >
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
            </form>

            <form onSubmit={updatePassword} className="mt-16">
              <h2 className="mb-8 text-3xl font-light">Change Password</h2>

              <div className="flex flex-col gap-6">
                <input
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Current Password"
                  className="border px-5 py-4 outline-none"
                />

                <input
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="New Password"
                  className="border px-5 py-4 outline-none"
                />

                <input
                  name="confirmNewPassword"
                  value={passwordForm.confirmNewPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="Confirm Password"
                  className="border px-5 py-4 outline-none"
                />
              </div>

              <button
                disabled={savingPassword}
                className="mt-8 bg-black px-8 py-4 text-white uppercase tracking-[3px] transition hover:bg-gray-900"
              >
                {savingPassword ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
