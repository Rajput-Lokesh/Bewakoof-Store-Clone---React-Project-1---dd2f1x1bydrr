import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { DropDown } from "../components/DropDown";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { HoverableComponent } from "../components/HoverableComponent";
import { Navigate, NavLink, useNavigate, Link } from "react-router-dom";
import React from "react";
import { useAuth } from "../Providers/AuthProvider";
import MoodIcon from "@mui/icons-material/Mood";

const NavBar = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const {
    setSearchProduct,
    setGender,
    getGender,
    getToken,
    getName,
    NameHandler,
    TokenHandler,
    wishListCount,
    setWishListCount,
    getProductQuntityInAddToCart,
    setCartItemCount,
    cartItemCount,
  } = useAuth();

  console.log("Inside nav");
  console.log(cartItemCount);
  const inputHandler = (e) => {
    setSearchProduct(e.target.value.trim());
    navigate("/productlist");
  };

  const logOutHandler = () => {
    setWishListCount(0);
    setCartItemCount(0);
    NameHandler(null);
    TokenHandler(null);
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("cartList");
    localStorage.removeItem("wishListCount");
    localStorage.removeItem("wishList");
    navigate("/");

    // console.log("Log Out handler");
    // console.log(localStorage.getItem("token"));
    // console.log(localStorage.getItem("name"));
  };

  function ProtectedRoute({ children }) {
    if (getToken) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
  return (
    <>
      <nav className="flex justify-between items-center px-[100px] py-[5px] fixed w-full top-[0px] bg-slate-50  z-40 border-b-[2px] ">
        <div style={{ display: "flex" }}>
          <NavLink to="/">
            <img
              className="cursor-pointer w-[100px] mr-[30px]"
              src="https://www.investcorp.com/wp-content/uploads/2019/11/42_Bewakoof_Logo_Black.png"
              alt="bewkoofLogo"
            />
          </NavLink>

          <div className="flex gap-[20px] list-none">
            <NavLink
              to="/productlist"
              className=" cursor-pointer"
              onClick={() => {
                setGender("Men");
              }}
            >
              <p
                className={
                  getGender === "Men"
                    ? "text-slate-900 font-bold   "
                    : "text-slate-500"
                }
              >
                Men
              </p>
            </NavLink>

            <NavLink
              to="/productlist"
              className=" cursor-pointer "
              onClick={() => {
                setGender("Women");
              }}
            >
              <p
                className={
                  getGender === "Women"
                    ? "text-slate-900 font-bold   "
                    : "text-slate-500"
                }
              >
                Women
              </p>
            </NavLink>
          </div>
        </div>

        <div className="flex">
          <div className="hide flex  items-center border h-10 w-full m-1 max-w-md px-2 rounded-md ">
            <input
              type="text"
              onChange={inputHandler}
              placeholder="search by products or collection"
              className="w-[300px] bg-transparent outline-none border-none px-3 placeholder:text-sm text-black m-1"
            />
            <SearchOutlinedIcon className="text-black text-2xl" />
          </div>

          <div className="flex justify-center items-center gap-1">
            <div className="relative inline-block  px-3 text-left">
              <div className="inline-flex rounded-md ">
                <button
                  type="button"
                  className="inline-flex items-center font-bold justify-center w-full"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  {getName ? (
                    <p className="text-grey flex gap-1 shadow-md py-1 px-4 rounded bg-slate-50">
                      <MoodIcon /> {getName}
                    </p>
                  ) : (
                    <div>
                      <AccountBoxIcon className="text-2xl hover:text-teal-400" />
                      <p className="text-grey"> {"LogIn/Register"}</p>
                    </div>
                  )}
                </button>
              </div>

              {showOptions && (
                <div
                  onMouseLeave={() => setShowOptions(false)}
                  className="absolute z-40 mt-[10px] text-sm w-[180px] rounded-md shadow-l bg-slate-200 text-black"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div className="py-1 " role="none">
                    {getName ? (
                      <>
                        <Link
                          to="/wishlist"
                          className="block px-3 py-2 font-bold  hover:bg-black hover:text-white"
                        >
                          <FavoriteBorderIcon className="inline mr-2 " /> My
                          Wishlist
                        </Link>

                        <button
                          onClick={logOutHandler}
                          className="block w-full text-left  px-3 py-2 font-bold hover:bg-black hover:text-white "
                          role="menuitem"
                        >
                          <LogoutIcon /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 font-bold hover:bg-teal-400 hover:text-gray-900"
                          role="menuitem"
                        >
                          <PersonPinIcon className="inline" /> Login
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 font-bold hover:bg-teal-400 hover:text-gray-900"
                          role="menuitem"
                        >
                          <PersonAddIcon className="inline" /> Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center">
              {localStorage.getItem("token") ? (
                <Link to="/addtocart">
                  <ShoppingBagOutlinedIcon />
                </Link>
              ) : (
                <Link to="/login">
                  <ShoppingBagOutlinedIcon />
                </Link>
              )}

              <p className="font-bold text-green">
                {localStorage.getItem("token") ? (
                  <sup>{cartItemCount ? cartItemCount : null}</sup>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
