import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { DropDown } from "../components/DropDown";
import { HoverableComponent } from "../components/HoverableComponent";
import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../Providers/AuthProvider";

const NavBar = () => {
  const navigate = useNavigate();
  const { setSearchProduct, setGender } = useAuth();
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const inputHandler = (e) => {
    // console.log(e.target.value);
    setSearchProduct(e.target.value.trim());
    navigate("/productlist");
  };
  const [isBol, setBol] = useState(false);

  return (
    <>
      <nav
        style={{
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 100px",
          position: "fixed",
          width: "100%",
          top: "0",
          backgroundColor: "white",
          zIndex: "999",
          borderBottom: "2px solid black",
        }}
      >
        <div style={{ display: "flex" }}>
          <NavLink to="/">
            <img
              className="cursor-pointer"
              style={{ width: "100px", marginRight: "30px" }}
              src="https://www.investcorp.com/wp-content/uploads/2019/11/42_Bewakoof_Logo_Black.png"
              alt="bewkoofLogo"
            />
          </NavLink>
          {/* <div>
            <div
              onMouseOver={() => {
                setBol(!isBol);
              }}
              onMouseLeave={() => {
                setBol(!isBol);
              }}
            >
              Category
            </div>
            {isBol && (
              <div style={{ position: "absolute", zIndex: "-1" }}>
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
            )}
          </div> */}
          <ol style={{ display: "flex", listStyle: "none", gap: "20px" }}>
            <li
              className="cursor-pointer"
              onClick={() => {
                setGender("Men");
                navigate("/productlist");
              }}
            >
              Men
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                setGender("Women");
                navigate("/productlist");
              }}
            >
              Women
            </li>
          </ol>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              listStyle: "none",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                border: "2px solid black",
                borderRadius: "10px",
                alignItems: "center",
              }}
            >
              <SearchOutlinedIcon />
              <input
                onChange={inputHandler}
                placeholder="search by products or collection"
                style={{
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  padding: "5px 15px",
                }}
              />
            </div>
            <div
              style={{ width: "2px", height: "35px", background: "gray" }}
            ></div>
            <button onClick={() => navigate("/login")} variant="contained">
              Login
            </button>
            <FavoriteBorderIcon />
            <ShoppingBagOutlinedIcon />
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
