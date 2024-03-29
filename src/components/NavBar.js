import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { DropDown } from "./DropDown";

const NavBar = () => {
  const [getSearchProdct, setSearchProduct] = useState("");
  const [isDropDownOpen, setDropDownOpen] = useState(false);

  const inputHandler = (e) => {
    // console.log(e.target.value);
    setSearchProduct(e.target.value);
  };

  return (
    <>
      {getSearchProdct}
      <nav
        style={{
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.investcorp.com%2Finvestcorp-leads-us-11-2-million-investment-in-bewakoof-com%2F&psig=AOvVaw2_QHn4J1CXQcopVmbM9vcX&ust=1711617094339000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMC6-tiMlIUDFQAAAAAdAAAAABAf"
            alt="bewkoofLogo"
          />
          <ol style={{ display: "flex", listStyle: "none", gap: "20px" }}>
            <li
              onClick={() => {
                setDropDownOpen(true);
              }}
            >
              MEN
              {isDropDownOpen && (
                <DropDown
                  isDroOpen={() => setDropDownOpen()}
                  isOpen={isDropDownOpen}
                />
              )}
            </li>
            <li>WOMEN</li>
            <li>MOBILE COVERS</li>
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
                }}
              />
            </div>
            <div
              style={{ width: "2px", height: "35px", background: "gray" }}
            ></div>
            <Button onClick={() => alert("login")} variant="contained">
              Login{" "}
            </Button>
            <FavoriteBorderIcon />
            <ShoppingBagOutlinedIcon />
          </div>
        </div>
      </nav>

      {/* <Button variant="contained">Hello world</Button> */}
    </>
  );
};

export default NavBar;
