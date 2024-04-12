import React, { useState, useEffect } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { Carousel } from "primereact/carousel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  bestDealsResponsiveOptions,
  responsiveOptions,
  getSliderImageObject,
  bannerImgs,
  toHotToMissedSectionImage,
  afterSliderSmallCarousal,
  getCategoryImageObject,
} from "../utilStaticData/StaticData";

export const Home = () => {
  const navigate = useNavigate();

  const [getProduct, setProducts] = useState([]);
  const entries = Object.entries(getCategoryImageObject);

  const productTemplate = (pro) => {
    return (
      <>
        <img src={pro} />
      </>
    );
  };

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
        <div className="relative w-fit m-2">
          <img
            onClick={() => {
              navigate(`/productlist/productdetails/${product._id}`);
            }}
            className="w-[330px]"
            src={product.displayImage}
            alt={product.name}
          />

          <p className="absolute top-[0px] bg-grey">PLUS_SIZE</p>

          <p className="flex justify-between">
            <b>Bewakoof®</b> <FavoriteBorderIcon />
          </p>

          <div className="h-[3rem]">
            <p>{product.name}</p>
          </div>
          <p className="text-slate-500">Category : {product.subCategory}</p>
          <p>
            <CurrencyRupeeIcon style={{ fontSize: "20px" }} /> {product.price}
          </p>
          <button className="p-1 border bg-[#42a2a2] border-black border-b-0  m-1 rounded-md w-full">
            VICOUS RYAN
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="absolute w-full top-[110px] bg-white z-[1]">
        {/* Home Page Main Corousel start */}
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
        {/* Home Page Main Corousel end */}

        {/* Home Page small Corousel start */}
        <ul className="flex flex-wrap justify-center ">
          {afterSliderSmallCarousal.map((value) => (
            <li className="text-center ">
              <img
                className="w-[8rem] m-1"
                // style={{ width: "150px", margin: "15px" }}
                src={value}
              />
              <span className="text-lg text-gray-800">Best Sellers</span>
            </li>
          ))}
        </ul>
        {/* Home Page small Corousel end */}

        <img src={bannerImgs[0]} className="w-full my-1" />

        {/* Trending Category Section start  */}
        <div>
          <h1 className="text-center font-bold text-3xl my-1">
            {"TRENDING CATEGORIES"}
          </h1>
          <ul className="flex flex-wrap justify-evenly">
            {entries.map(([key, value]) => (
              <li className="text-center ">
                <img
                  onClick={() => navigate(`/productlist?type=${key}`)}
                  style={{ height: "350", width: "270px" }}
                  src={value}
                />
                <span className="text-lg text-gray-800">{key}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Trending Category Section End  */}

        {/* Best Deals Corousal start  */}
        <div>
          <h1 className="text-center font-bold text-3xl my-1">
            {"BEST DEALS"}
          </h1>
          <Carousel
            value={getProduct}
            numVisible={5}
            numScroll={1}
            responsiveOptions={bestDealsResponsiveOptions}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={bestSellerProTemplate}
          />
        </div>
        {/* Best Deals Corousal end  */}

        {/* Banner image 2 */}
        <img src={bannerImgs[1]} className="w-full my-[15px]" />

        {/* TO HOT TO BE MISSED section start  */}
        <div>
          <h1 className="text-center font-bold text-xl my-1">
            {" TO HOT TO BE MISSED "}
          </h1>
          <div className="flex flex-wrap">
            {toHotToMissedSectionImage.map((img) => (
              <img src={img} className="w-1/2" />
            ))}
          </div>
        </div>
        {/* TO HOT TO BE MISSED section end  */}

        {/* Banner Image 3 */}
        <img src={bannerImgs[2]} className="w-full my-1" />
        {/* Banner Image 4 */}
        <img src={bannerImgs[3]} className="w-full my-1" />
      </div>
    </>
  );
};
