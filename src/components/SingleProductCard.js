import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";

export const SingleProductCard = () => {
  const productUrl =
    "https://academics.newtonschool.co/api/v1/ecommerce/clothes/products";
  const [getProduct, setProduct] = useState([]);
  useEffect(() => {
    fetch(productUrl, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // alert( JSON.stringify(res.data));
        console.log("I m from Single Product");
        console.log(res);
        setProduct(res.data);
        console.log(res.data);
      });
  }, []);

  const sortProduct = () => {
    let sortedProductRating = [...getProduct].sort((a, b) => {
      return b.ratings - a.ratings;
    });
    setProduct(sortedProductRating);
  };
  const sortPrice = () => {
    let sortedProductRating = [...getProduct].sort((a, b) => {
      return a.price - b.price;
    });
    setProduct(sortedProductRating);
  };

  return (
    <>
      {/* <Button variant="contained">Sort By Rating</Button> */}
      <button
        onClick={sortPrice}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "5px 10px",
          borderRadius: "10px",
          margin: "10px",
        }}
      >
        Sort By Price
      </button>
      <button
        onClick={sortProduct}
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "5px 10px",
          borderRadius: "10px",
          margin: "10px",
        }}
      >
        Sort By Rating
      </button>
      <div className="flex bg-white flex-wrap   justify-between bg-slate-700">
        {getProduct.map((product, index) => (
          <div
            style={{
              position: "relative",
              //   border: "2px solid black",
              maxWidth: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "5px",
              //   alignItems: "center",
            }}
          >
            <img width={"300px"} src={product.displayImage} />
            <p style={{ position: "absolute", top: "0px", background: "gray" }}>
              PLUS_SIZE
            </p>
            <div
              style={{ position: "absolute", bottom: "160px" }}
              className="flex"
            >
              <StarIcon color="success"></StarIcon>
              <div className="text-slate-400">
                {product.ratings.toFixed(2)}{" "}
              </div>
            </div>
            <p>Bewakoof®</p>
            <p>{product.name}</p>
            <p>{product.subCategory}</p>
            <p>
              {" "}
              <CurrencyRupeeIcon style={{ fontSize: "20px" }} /> {product.price}
            </p>
            <Button
              style={{
                padding: "5px",
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
              }}
            >
              VICOUS RYAN
            </Button>
          </div>
        ))}
      </div>
      {/* <div className="flex flex-wrap">
        {getProduct.map((product, index) => (
          <div
            key={index}
            className="border flex-col  justify-center items-center max-width-3"
          >
            <p>{product.name}</p>
            <img
              width={"200px"}
              src={product.displayImage}
              alt={`Product ${index}`}
            />{" "}
            {product.price}
            {product.description}
            {"Rating "}
            <br />
            {product.ratings} {/* Add alt text for accessibility */}
      {/* </div>
        ))}
      </div> */}{" "}
    </>
  );
};
