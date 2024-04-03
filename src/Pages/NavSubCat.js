import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const NavCat = () => {
  const [getCategories, setCategories] = useState([]);
  const { API_BASE_URL, getGender } = useAuth();
  let navigate = useNavigate();

  const catUrl = `${API_BASE_URL}/api/v1/ecommerce/clothes/categories`;

  useEffect(() => {
    fetch(catUrl, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const navi = (subCategory) => {
    navigate(`/productlist?type=${subCategory}`);
  };
  return (
    <div>
      <nav
        style={{
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "5px 100px",
          position: "fixed", // Add this line to make the navbar fixed
          width: "100%", // Add this line to make the navbar full width
          top: "60px", // Add this line to position the navbar at the top
          backgroundColor: "white", // Add this line to set the background color of the navbar
          zIndex: "999", // Add this line to set the z-index to ensure the navbar is above other content
          // style={{
          //   display: "flex",
          //   justifyContent: "space-evenly",

          //   gap: "10px",
          //   padding: "15px 15px 30px",
        }}
      >
        {getCategories.map((catName, index) => (
          <p
            className="cursor-pointer"
            key={index}
            onClick={() => {
              // alert(catName);
              navi(catName);
            }}
          >
            {catName.toUpperCase()}
          </p>
        ))}
      </nav>
      {/* <h1 className="text-center text-4xl my-3">{` ${subCategory.toLocaleUpperCase()} PRODUCT PAGE `}</h1>
      <div className="flex flex-wrap justify-around bg-slate-700 p-4 ">
        {getProduct.map((product, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              maxWidth: "24%",
              margin: "5px",
              height: "",
            }}
          >
            <img
              onClick={() => {
                alert(product._id);
              }}
              width="450px"
              src={product.displayImage}
              alt={product.name}
            />
            <p style={{ position: "absolute", top: "0px", background: "gray" }}>
              PLUS_SIZE
            </p>
            <div
              style={{ position: "absolute", bottom: "200px" }}
              className="flex"
            >
              <StarIcon color="success" />
              <div className="text-slate-400">{product.ratings.toFixed(2)}</div>
            </div>
            <p className="flex justify-between">
              <b>Bewakoof®</b> <FavoriteBorderIcon />
            </p>
            <p>{product.name}</p>
            <p>{product.subCategory}</p>
            <p>
              <CurrencyRupeeIcon style={{ fontSize: "20px" }} /> {product.price}
            </p>
            <Button
              style={{
                padding: "5px",
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
                width: "100%",
              }}
            >
              VICOUS RYAN
            </Button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default NavCat;
