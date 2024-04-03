import React, { useState, useEffect } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { Carousel } from "primereact/carousel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { getCategoryImageObject, afterSliderSmallCarousal } = useAuth();
  const [getProduct, setProducts] = useState([]);
  const entries = Object.entries(getCategoryImageObject);

  const productTemplate = (pro) => {
    return (
      <>
        <img src={pro} />
      </>
    );
  };
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const getSliderImageObject = [
    "https://images.bewakoof.com/uploads/grid/app/1x4-summerpalooza-ik-ezgif-com-optimize-1711301716.gif",
    "https://images.bewakoof.com/uploads/grid/app/Peanuts-YFED-1x1-Graphic-final-1711690450.jpg",
    "https://images.bewakoof.com/uploads/grid/app/1x1-MARCH-GPOT-Common-ezgif-com-optimize--2--1711457859.gif",
    "https://images.bewakoof.com/uploads/grid/app/1x1-Epic-Fandom-Bundle-1711780965.jpg",

    "https://images.bewakoof.com/uploads/grid/app/HC--1x1-Trendy-Jeans--1--1711457861.gif",

    "https://images.bewakoof.com/uploads/grid/app/1x4-summerpalooza-ik-ezgif-com-optimize-1711301716.gif",
    "https://images.bewakoof.com/uploads/grid/app/12th-birthday-IK-RM-1X1--2--1711780967.gif",
    "https://images.bewakoof.com/uploads/grid/app/b-day-bash-hc-1x1-1711780966.jpg",

    "https://images.bewakoof.com/uploads/grid/app/HC--1x1-Trendy-Jeans--1--1711457861.gif",
  ];

  useEffect(() => {
    const bestSellerPro = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort={"rating":-1}`;

    fetch(bestSellerPro, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const bestSellerProTemplate = (product) => {
    return (
      <>
        <div
          style={{
            position: "relative",
            maxWidth: "100%",
            margin: "5px",
            height: "",
          }}
        >
          <img
            onClick={() => {
              alert(product._id);
            }}
            width="350px"
            src={product.displayImage}
            alt={product.name}
          />
          <p style={{ position: "absolute", top: "0px", background: "gray" }}>
            PLUS_SIZE
          </p>
          {/* <div
            style={{ position: "absolute", bottom: "200px" }}
            className="flex"
          >
            <StarIcon color="success" />
            <div className="text-slate-400">{product.ratings.toFixed(2)}</div>
          </div> */}
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
      </>
    );
  };

  return (
    <>
      <div
        style={{
          position: "absolute", // Add this line to make the navbar fixed
          width: "100%", // Add this line to make the navbar full width
          top: "90px", // Add this line to position the navbar at the top
          backgroundColor: "white", // Add this line to set the background color of the navbar
          zIndex: "1",
        }}
      >
        <Carousel
          value={getSliderImageObject}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplate}
        />

        <ul className="flex flex-wrap justify-center ">
          {afterSliderSmallCarousal.map((value) => (
            <li className="text-center ">
              <img
                style={{ height: "300", width: "150px", margin: "15px" }}
                src={value}
              />
              <span className="text-lg text-gray-800">Best Sellers</span>
            </li>
          ))}
        </ul>
        <img
          src="https://images.bewakoof.com/uploads/grid/app/thin-banner-desktop-blockbuster-deal-T-Shirts-Under--499-1711725886.jpg"
          className="w-full my-1"
        />
        <h1 className="text-center font-bold text-3xl my-1">
          {"TRENDING CATEGORIES"}
        </h1>
        {/* <div className="flex flex-wrap">
        {getSliderImageObject.map((link) => (
          <img style={{ width: "400px" }} src={link} />
        ))}
      </div> */}
        <ul className="flex flex-wrap justify-evenly">
          {entries.map(([key, value]) => (
            <li className="text-center ">
              <img
                onClick={() => navigate(`subCategory/${key}`)}
                style={{ height: "350", width: "270px" }}
                src={value}
              />
              <span className="text-lg text-gray-800">{key}</span>
            </li>
          ))}
        </ul>

        <div>
          <h1 className="text-center font-bold text-3xl my-1">
            {"BEST DEALS"}
          </h1>
          <Carousel
            value={getProduct}
            numVisible={5}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={bestSellerProTemplate}
          />
        </div>
        <img
          src=" https://images.bewakoof.com/uploads/grid/app/Birthday-PREBUZZ-ThinStrip-desktop--1--1711721721.jpg"
          className="w-full my-[15px]"
        />

        <div>
          <h1 className="text-center font-bold text-xl my-1">
            {" TO HOT TO BE MISSED "}
          </h1>
          <div className="flex flex-wrap">
            <img
              src=" https://images.bewakoof.com/uploads/grid/app/DESKTOP---MID-SIZE-BANNER---TDD---common-1711782197.png"
              className="w-1/2 "
            />
            <img
              src="https://images.bewakoof.com/uploads/grid/app/Buy-2-Joggers-1499-Common-Desktop-MIDSIZE-Banner-1711782196.jpg"
              className="w-1/2 "
            />

            <img
              src=" https://images.bewakoof.com/uploads/grid/app/Common-Trackpants-70-Off-Desktop-Midsize-banner-1711782197.jpg"
              className="w-1/2 "
            />
            <img
              src=" https://images.bewakoof.com/uploads/grid/app/Desktop-midsize-OS-tees-common-ezgif-com-optimize-1711782200.gif"
              className="w-1/2"
            />
          </div>
        </div>
        <img
          src="https://images.bewakoof.com/uploads/grid/app/Desktop-Strip-3-1672040129.jpg"
          className="w-full my-1"
        />
        <img
          src="https://images.bewakoof.com/uploads/grid/app/Desktop-Strip-3-1669022420.jpg"
          className="w-full my-1"
        />
      </div>
    </>
  );
};
