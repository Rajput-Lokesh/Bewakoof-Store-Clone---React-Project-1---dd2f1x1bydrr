import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";
import DOMPurify from "dompurify";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowCircleLeftTwoToneIcon from "@mui/icons-material/ArrowCircleLeftTwoTone";
import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../Providers/AuthProvider";

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWishList, addToCart } = useAuth();

  const [getSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToBag, setIsAddedToBag] = useState(false);

  const [productDetails, setProductDetails] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [showDescription, setShowDescription] = useState(null);
  const [getProductReview, setProductReviews] = useState([]);
  const [selectRating, setSelectRating] = useState(1);
  const [getUserReview, setUserReview] = useState("");

  useEffect(() => {
    fetchIdDetails();
    fetchReviews();
  }, [id]);

  const fetchIdDetails = async () => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/product/${id}`,
        {
          headers: {
            projectId: "gar9pityowqx",
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

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/review/${id}`,
        {
          headers: {
            projectId: "gar9pityowqx",
          },
        }
      );
      setProductReviews(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const toggleDescription = (description) => {
    setShowDescription(showDescription === description ? null : description);
  };

  const selctSizeHandler = (size) => {
    setSize(size);
  };

  const selctQuantityHandler = (event) => {
    const selectedQuantity = parseInt(event.target.value);
    setQuantity(selectedQuantity);
  };

  const handlePrevImg = () => {
    setCurrentImg((prev) =>
      prev > 0 ? prev - 1 : productDetails.images.length - 1
    );
  };

  const handleNextImg = () => {
    setCurrentImg((prev) =>
      prev < productDetails.images.length - 1 ? prev + 1 : 0
    );
  };

  const handleRating = (event) => {
    setSelectRating(+event.target.value);
  };

  const handleReviewTextChange = (event) => {
    setUserReview(event.target.value);
  };

  const QuantityOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const postReview = async (id) => {
    try {
      const response = await axios.post(
        `https://academics.newtonschool.co/api/v1/ecommerce/review/${id}`,
        {
          ratings: selectRating,
          text: getUserReview,
        },
        {
          headers: {
            projectId: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        fetchReviews();
        setUserReview("");
        setSelectRating(1);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/review/${reviewId}`,
        {
          headers: {
            projectId: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container absolute top-[6rem] mx-auto p-4">
      {productDetails && (
        <div className="flex flex-col md:flex-row justify-around items-start gap-8">
          <div className="flex flex-col items-center   gap-4">
            <div className="flex gap-1 ">
              <button className="w-[4rem]" onClick={handlePrevImg}>
                <ArrowCircleLeftTwoToneIcon
                  className="text-sky-500 hover:text-slate-900"
                  fontSize="large"
                />
              </button>
              <div className="flex">
                {productDetails.images.map((img, index) => (
                  <img
                    key={index}
                    className={`h-[100px] w-[180px] mt-[5px] ${
                      index === currentImg ? "border-2 border-blue-500" : ""
                    }`}
                    src={img}
                    alt={`Product ${index + 1}`}
                    onClick={() => setCurrentImg(index)}
                  />
                ))}
              </div>
              <button className="" onClick={handleNextImg}>
                <ArrowCircleRightTwoToneIcon
                  className="text-sky-500 hover:text-slate-900"
                  fontSize="large"
                />
              </button>
            </div>

            <div>
              <img
                src={productDetails.images[currentImg]}
                alt={productDetails.name}
                className="mt-4 md:mt-0 w-[300px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full overflow-auto">
            <h1 className="text-3xl font-extrabold">
              {productDetails.seller.name}
            </h1>
            <h1 className="opacity-[70%]">{productDetails.name}</h1>
            <div className="flex gap-1">
              {productDetails.size.map((iSize, index) => (
                <p
                  onClick={() => {
                    selctSizeHandler(iSize);
                  }}
                  key={index}
                  className={`rounded text-sm border  w-[3rem] h-[2rem] flex justify-center items-center bg-midnight hover:text-xl hover:text-bermuda hover:bg-midnight ${
                    getSize === iSize
                      ? "text-slate-50 text-xl font-bold bg-amber-500"
                      : " text-black"
                  }`}
                >
                  {iSize}
                </p>
              ))}
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
            <div className="flex gap-1">
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
            <div className="flex gap-1 border w-fit rounded-lg shadow-lg">
              {/* Other product details */}
            </div>
            <div className="flex items-center">
              <label className="text-xl font-bold">Select Quantity :</label>
              <select
                onChange={(event) => {
                  selctQuantityHandler(event);
                }}
                value={quantity}
                name="quantity"
                className=" w-fit border rounded-md px-1 mx-1"
              >
                {QuantityOption.map((op, index) => (
                  <option value={op} key={index}>
                    {op}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-1">
              <Button
                onClick={() => {
                  if (!isAddedToBag && quantity && getSize) {
                    addToCart(productDetails._id, quantity, getSize);
                    setIsAddedToBag(true);
                  } else if (quantity && getSize) {
                    navigate("/addtocart");
                  } else {
                    alert("Please select quantity and size to add to cart!");
                  }
                }}
                variant="outlined"
                startIcon={<ShoppingBagOutlinedIcon />}
              >
                {isAddedToBag && quantity && getSize
                  ? "GO TO BAG"
                  : "ADD TO BAG"}
              </Button>
              <Button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    addToWishList(productDetails._id);
                  } else {
                    alert("Please Log in first.!");
                  }
                }}
                variant="contained"
                startIcon={<FavoriteBorderIcon />}
              >
                ADD TO WISHLIST
              </Button>
            </div>
            <div className="flex justify-between text-metal text-xl hover:text-grey ">
              {/* Other product details */}
            </div>
            <dl>
              <dt
                className="flex  justify-between p-2 border w-full rounded-sm bg-sky-600 text-white "
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

              {/* Other description sections */}
            </dl>
            <div className="bg-slate-300  p-2 flex gap-2 flex-col justify-center rounded-md">
              <input
                placeholder="Write your review here..."
                className="border w-full p-2 rounded-lg h-[100px]"
                value={getUserReview}
                onChange={handleReviewTextChange}
              />
              <div className="text-center">
                <label htmlFor="selectRating">Select Rating</label>
                <select
                  id="selectRating"
                  value={selectRating}
                  onChange={handleRating}
                >
                  <option value="">--Select Rating--</option>
                  <option value={1}>1 Star</option>
                  <option value={2}>2 Star</option>
                  <option value={3}>3 Star</option>
                  <option value={4}>4 Star</option>
                  <option value={5}>5 Star</option>
                </select>
              </div>
              <Button
                variant="contained"
                onClick={() => postReview(productDetails._id)}
              >
                Submit Review
              </Button>
            </div>
            <div className="shadow-lg rounded-lg p-3">
              <h1 className="text-3xl font-bold text-center ">
                --Product Reviews--
              </h1>
              {getProductReview.map((pro) => (
                <div className="border-b-1  shadow-lg mt-4 p-1 bg-white">
                  <h1 className="text-xl">{pro.text}</h1>
                  <div className="flex items-center">
                    <h4 className="text-metal opacity-60">Rating :</h4>
                    <div className="flex ml-2">
                      {[...Array(pro.ratings)].map((_, index) => (
                        <svg
                          key={index}
                          className="h-6 w-6 fill-current text-amber-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 1l2.94 6.41L19 7.35l-5.65 5.43L15.88 19 10 15.47 4.12 19l1.53-6.22L1 7.35l6.06.06L10 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <button
                    className="border-metal border rounded-md hover:text-black hover:font-bold text-metal px-2 py-1 my-1"
                    onClick={() => {
                      deleteReview(pro._id);
                    }}
                  >
                    Delete review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
