
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import API from "../services/api";
const WishListContext = createContext();
export const WishListProvider = ({
  children,
}) => {
  const [wishList, setWishList] =
    useState([]);
  // Fetch Wishlist
  const fetchWishList = async () => {
    try {
      const response =
        await API.get("/wishlist");
      setWishList(
        response.data.wishList
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWishList();
  }, []);
  // Add To Wishlist
  const addToWishList = async (
    productId
  ) => {
    try {
      await API.post(
        "/wishlist/add",
        {
          productId,
        }
      );
      toast.success(
        "Added to wishlist"
      );
      fetchWishList();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data
          ?.message ||
          "Wishlist not updated"
      );
    }
  };
  // Remove Wishlist
  const removeFromWishList = async (
    id
  ) => {
    try {
      await API.delete(
        `/wishlist/${id}`
      );
      toast.success(
        "Removed from wishlist"
      );
      fetchWishList();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data
          ?.message ||
          "Wishlist not updated"
      );
    }
  };
  return (
    <WishListContext.Provider
      value={{
        wishList,
        fetchWishList,
        addToWishList,
        removeFromWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
export const useWishList = () =>
  useContext(WishListContext);

