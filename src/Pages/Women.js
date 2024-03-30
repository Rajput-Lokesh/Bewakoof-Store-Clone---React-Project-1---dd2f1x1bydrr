import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";
export const Women = () => {
  const productUrl = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"gender":"Women","subCategory":"tshirt"}`;
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
      <h1 className="text-center text-4xl my-3">
        {"<- Women Product Page ->"}
      </h1>
      <div className="flex bg-white flex-wrap   justify-between bg-slate-700">
        {getProduct.map((product, index) => (
          <div
            style={{
              position: "relative",
              //   border: "2px solid black",
              maxWidth: "24%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "5px",
              //   alignItems: "center",
            }}
          >
            <img
              onClick={(e) => {
                // <ProductDetails value={e} />;

                alert(product._id);
                alert(e);
              }}
              width={"450px"}
              src={product.displayImage}
            />
            <p style={{ position: "absolute", top: "0px", background: "gray" }}>
              PLUS_SIZE
            </p>
            <div
              style={{ position: "absolute", bottom: "200px" }}
              className="flex"
            >
              <StarIcon color="success"></StarIcon>
              <div style={{ color: "gray" }}>{product.ratings.toFixed(2)} </div>
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
    </>
  );
};
