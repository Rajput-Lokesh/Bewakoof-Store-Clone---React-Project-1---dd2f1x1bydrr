import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";
import DOMPurify from "dompurify";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [showDescription, setShowDescription] = useState(null);

  const toggleDescription = (description) => {
    setShowDescription(showDescription === description ? null : description);
  };
  useEffect(() => {
    fetchIdDetails();
  }, [id]);

  const fetchIdDetails = async () => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,
        {
          headers: {
            projectId: "rhxg8aczyt09",
          },
        }
      );
      const sanitizedDescription = DOMPurify.sanitize(
        response.data.data.description
      );
      setProductDescription(sanitizedDescription);
      setProductDetails(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handlePrevImg = () => {
    setCurrentImg((prev) =>
      prev > 0 ? prev - 1 : productDetails.images.length - 1
    );
  };

  const handleNextImg = () => {
    setCurrentImg((prev) => (prev < 4 ? prev + 1 : 0));
  };

  const QuantityOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div
        className="flex justify-around p-2 gap-[100px] "
        style={{ position: "absolute", top: "100px" }}
      >
        {productDetails && (
          <div className="flex px-[300px] flex-col justify-center gap-4 leading-6 md:flex-row">
            <div className="flex ">
              <div className="flex flex-col justify-center ">
                <button onClick={handlePrevImg}>↑</button>
                {productDetails.images.map((img, index) => (
                  <img
                    key={index}
                    style={{
                      height: "125px",
                      width: "250px",
                      marginTop: "5px",
                      border: index === currentImg ? "2px solid blue" : "none",
                    }}
                    src={img}
                    alt={`Product ${index + 1}`}
                    onClick={() => setCurrentImg(index)}
                  />
                ))}
                <button onClick={handleNextImg}>↓</button>
              </div>
              <div>
                <img
                  // style={{
                  //   marginTop: "30px",
                  //   width: "500px",
                  //   border: "2px solid blue",
                  // }}
                  src={productDetails.images[currentImg]}
                  alt={productDetails.name}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full my-[30px]">
              <h1 className="text-3xl font-extrabold">
                {productDetails.seller.name}
              </h1>

              <h1 className="opacity-[70%]">{productDetails.name}</h1>
              <div className="flex gap-1 flex-col ">
                <p className="font-bold">Please Select Size</p>
                <div className="flex gap-1">
                  {productDetails.size.map((s) => (
                    <p className="rounded text-sm border w-6 h-6 flex justify-center items-center hover:text-xl hover:text-bermuda hover:bg-midnight">
                      {s}
                    </p>
                  ))}
                </div>
              </div>

              <p>
                <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                {productDetails.price}{" "}
                <span className="text-sm line-through">
                  {productDetails.price * 2}
                </span>
              </p>
              <p className="border-y-2 rounded-sm  py-1 opacity-50">
                TriBe members get an extra discount of ₹50 and FREE shipping.
              </p>

              <div className="flex gap-1 my-1">
                <Button
                  onClick={() => {
                    alert("BUY 3 FOR 999");
                  }}
                  variant="contained"
                  color="success"
                >
                  BUY 3 FOR 999
                </Button>
                <Button
                  onClick={() => {
                    alert("100% COTTON");
                  }}
                  color="secondary"
                  variant="outlined"
                >
                  100% COTTON
                </Button>
                <Button
                  onClick={() => {
                    alert("100% COTTON");
                  }}
                  color="secondary"
                  variant="outlined"
                >
                  {productDetails.sellerTag}
                </Button>
              </div>

              <div className="flex gap-1 border w-fit rounded-lg shadow-lg my-1">
                <div className="flex flex-col justify-center items-center  p-1 ">
                  <img
                    className="w-[100px]"
                    src="https://images.bewakoof.com/web/Premium-Terry-Cotton-1698749890.png"
                  />
                  <span className="text-sm">Premium Terry Cotton</span>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <img
                    className="w-[100px]"
                    src="https://images.bewakoof.com/web/Enhanced-Durability-1698749861.png"
                  />
                  <span className="text-sm">Enhanced Durability</span>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <img
                    className="w-[100px]"
                    src="https://images.bewakoof.com/web/Thick---Resilient-Fabric-1698749900.png"
                  />
                  <span className="text-sm">Thick & Resilient Fabric</span>
                </div>
              </div>
              <h1 className="flex bg-metal border max-w-fit pr-1 text-white ">
                <StarIcon color="success"></StarIcon>
                <span>{productDetails.ratings.toFixed(2)}</span>
              </h1>
              <h1>
                COLOR: <span>{productDetails.color}</span>
              </h1>
              <div className="flex items-center">
                <label className="text-xl font-bold">Select Quantity :</label>
                <select className=" w-fit border rounded-md px-1 mx-1">
                  {QuantityOption.map((op, index) => (
                    <option key={index}>{op}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-1">
                <Button
                  onClick={() => {
                    alert("Add To Bag Clicked");
                  }}
                  variant="outlined"
                  startIcon={<ShoppingBagOutlinedIcon />}
                >
                  ADD TO BAG
                </Button>
                <Button
                  onClick={() => {
                    alert("Add To WishList Clicked");
                  }}
                  // color="success"
                  variant="contained"
                  startIcon={<FavoriteBorderIcon />}
                >
                  ADD TO WISHLIST
                </Button>
              </div>

              {/* <h1>{productDetails.brand}</h1> */}
              <h1>{productDetails.subCategory}</h1>
              {/* <ul>
                {productDetails.size.map((size) => {
                  <li>{size}</li>;
                })}
              </ul> */}
              <h1>{productDetails.sellerTag}</h1>
              <h1>{productDetails.gender}</h1>
              <dl>
                <dt
                  className="flex rounded-md justify-between p-2 border w-full rounded-sm bg-bermuda text-white "
                  onClick={() => toggleDescription("productDescription")}
                >
                  <h1>Product Description </h1>
                  <h1 className="text-3xl">
                    {showDescription === "productDescription" ? "-" : "+"}
                  </h1>
                </dt>
                {showDescription === "productDescription" && (
                  <dd>
                    <div
                      dangerouslySetInnerHTML={{ __html: productDescription }}
                    />
                  </dd>
                )}

                <dt
                  className="flex rounded-md  justify-between p-2 border w-full rounded-sm bg-bermuda text-white "
                  onClick={() => toggleDescription("returnsDescription")}
                >
                  <h1> 15 Days Returns & Exchange</h1>
                  <h1 className="text-3xl">
                    {showDescription === "returnsDescription" ? "-" : "+"}
                  </h1>
                </dt>
                {showDescription === "returnsDescription" && (
                  <dd>
                    Easy returns upto 15 days of delivery. Exchange available on
                    select pincodes
                  </dd>
                )}
              </dl>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
