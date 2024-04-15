import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getHeaders, API_BASE_URL } from "../apiServices/ApiCallBewkoof";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Token related States start

  const [getName, setName] = useState(localStorage.getItem("name"));

  const [token, setToken] = useState(localStorage.getItem("token"));

  // Token related States end

  // Wishlist / addtocart list states start
  const countWishList = sessionStorage.getItem(`${token}`);

  const [wishListCount, setWishListCount] = useState(0);

  const [totalAmmount, setTotalAmmount] = useState(0);

  const [wishlistItems, setWishListItems] = useState([]);

  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);

  // Wishlist / addtocart list states end

  const [getGender, setGender] = useState("Men");
  const [getSearchProdct, setSearchProduct] = useState("");

  const [getCategories, setCategories] = useState([]);

  const [getProductQuntityInAddToCart, setProductQuantityInAddToCart] =
    useState(0);

  const [cartItemToggle, setCartItemToggle] = useState(true);

  const [orderCreatedResponse, setOrderCreatedResponse] = useState();

  const [storageData, setStorageData] = useState(
    JSON.parse(localStorage.getItem("addData"))
  );

  const NameHandler = (data) => {
    setName(data);
    localStorage.setItem("name", data);
  };

  const TokenHandler = (tokenFromLogInApi) => {
    setToken(tokenFromLogInApi);
    localStorage.setItem("token", tokenFromLogInApi);
  };

  // Wislist Fetch data ,add to wishlist , remove from wishlist
  const fetchWishList = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/ecommerce/wishlist/`,
        getHeaders(localStorage.getItem("token"))
      );

      if (response.status === 200) {
        setWishListItems(response.data.data.items);
        setWishListCount(response.data.results);
      }
    } catch (err) {
      console.log("Curtom error msg =>", err);
    }
  };

  const addToWishList = async (id) => {
    console.log("add to wishList called");
    console.log(token);
    try {
      const response = await axios.patch(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
        {
          productId: id,
        },
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        setWishListItems(response.data.data.items);
        setWishListCount(response.data.results);
        alert(response.data.message);
        toast.success("Product Added successfully!");
      } else {
        console.log(response.data.message);
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      console.log("Catch Block");
      alert(err.response.data.message);
      console.log("Error shows ", err);
    }
  };

  // Fetch Cart Items and add to cart items
  const addToCart = async (id, quantity = 1, size = "M") => {
    try {
      if (quantity && size) {
        const response = await axios.patch(
          `${API_BASE_URL}/api/v1/ecommerce/cart/${id}`,
          {
            quantity: quantity,
            size: size,
          },
          {
            headers: {
              projectId: "gar9pityowqx",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.status === "success") {
          // setCartItemCount(response.data.results);
          setCartItemList(response.data.items);
          setCartItemCount(response.results);
          alert(response.data.message);
        }
      }
    } catch (err) {
      console.log("Error Shows ", err);
    }
  };

  const deleteWishListItems = async (id) => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${id}`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status === "success") {
        // setCartItemToggle(!cartItemToggle);
        setWishListCount(response.data.results);
        setWishListItems(response.data.data.items);
        localStorage.setItem("wishListCount", response.data.results);
        localStorage.setItem(
          "wishList",
          JSON.stringify(response.data.data.items)
        );
        alert(response.data.message);
      }
      // setwishListToggle(!wishListToggle);
    } catch (err) {
      console.log("Error shows ", err);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/ecommerce/cart`,
        getHeaders(localStorage.getItem("token"))
      );

      if (response.data.status === "success") {
        setCartItemList(response.data.data.items);
        setTotalAmmount(response.data.data.totalPrice);
        setProductQuantityInAddToCart(response.data.results);
        setCartItemCount(response.data.data.items.length);
      }
    } catch (err) {
      console.log("Error Shows ", err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartItemCount]);

  const deleteAllCartItems = async () => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCartItems();
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,

        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  let object = {
    API_BASE_URL,
    totalAmmount,
    deleteCartItem,
    setTotalAmmount,
    fetchWishList,
    getSearchProdct,
    setSearchProduct,
    getProductQuntityInAddToCart,
    wishListCount,
    setWishListCount,
    cartItemCount,
    setCartItemCount,
    deleteWishListItems,
    storageData,
    setStorageData,
    deleteAllCartItems,
    getCategories,
    setCategories,
    cartItemList,
    orderCreatedResponse,
    setOrderCreatedResponse,
    setCartItemList,
    getGender,
    setGender,
    addToCart,
    wishlistItems,
    getName,
    TokenHandler,
    cartItemCount,
    NameHandler,
    setWishListItems,
    addToWishList,
    token,
    fetchCartItems,
  };
  return (
    <>
      <AuthContext.Provider value={object}>{children}</AuthContext.Provider>
    </>
  );
};

// custom hooks
export const useAuth = () => {
  return useContext(AuthContext);
};
