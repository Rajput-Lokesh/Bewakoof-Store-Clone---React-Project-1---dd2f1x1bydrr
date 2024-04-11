import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";
import DOMPurify from "dompurify";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../Providers/AuthProvider";

export function ProductDetails() {
  const { id } = useParams();
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const {
    addToWishList,
    addToCart,
    setWishListCount,
    wishListCount,
    storageData,
    getToken,

    cartItemCount,
    setCartItemCount,
    setCartItemToggle,
    cartItemToggle,
    fetchCartItems,
  } = useAuth();
  // console.log("Token");
  // console.log(getToken);
  const [getSize, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToBag, setIsAddedToBag] = useState(false);

  const [productDetails, setProductDetails] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [showDescription, setShowDescription] = useState(null);
  const [toggleSize, settoggleSize] = useState(false);
  const [getProductReview, setProductReviews] = useState([]);

  const [selectRating, setSelectRating] = useState(1);
  const [getUserReview, setUserReview] = useState("");

  // console.log("GetProduct type", typeof getProductReview);

  const toggleDescription = (description) => {
    setShowDescription(showDescription === description ? null : description);
  };
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
    // console.log("Fetch reviw Token");
    // console.log(tokenFromSession);
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/review/${id}`,
        {
          headers: {
            projectId: "gar9pityowqx",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response Product details => ");
      console.log(response.data.data);

      setProductReviews(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const postReview = async (id) => {
    // alert("Post review tokem");
    console.log(token);
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

      // setProductReviews(response.data.data);
      if (!response.ok) {
        fetchReviews();
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
            Authorization: `Bearer ${token}`,
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
  const selctSizeHandler = (size) => {
    setSize(size);
    settoggleSize(false);
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
    setCurrentImg((prev) => (prev < 4 ? prev + 1 : 0));
  };

  const handleRating = (event) => {
    setSelectRating(+event.target.value);
  };

  const handleReviewTextChange = (event) => {
    setUserReview(event.target.value);
  };

  const QuantityOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      <div className="absolute top-[100px] flex justify-around p-2 gap-[100px]">
        {productDetails && (
          <div className="flex px-[300px] flex-col justify-center gap-4 leading-6 md:flex-row">
            <div className="flex  mt-[30px] gap-1">
              <div className="flex flex-col justify-start ">
                <button
                  className="hover:border border hover:text-white hover:bg-grey rounded-sm bg-silver"
                  onClick={handlePrevImg}
                >
                  ↑
                </button>
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
                <button
                  className="hover:border border hover:text-white hover:bg-grey rounded-sm bg-silver"
                  onClick={handleNextImg}
                >
                  ↓
                </button>
              </div>
              <div className="mt-[32px] ">
                <img
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
                  <div className="flex gap-1">
                    {productDetails.size.map((iSize, index) => (
                      <p
                        onClick={() => {
                          selctSizeHandler(iSize);
                        }}
                        key={index}
                        className={`rounded text-sm border w-6 h-6 flex justify-center items-center bg-midnight hover:text-xl hover:text-bermuda hover:bg-midnight ${
                          getSize === iSize
                            ? "text-white text-xl font-bold"
                            : " text-black"
                        }`}
                      >
                        {iSize}
                      </p>
                    ))}
                  </div>
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
                      // fetchCartItems();
                      navigate("/addtocart");
                    } else {
                      alert("Plese Select Quntity and Size to Add TO Cart !");
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
                    console.log(productDetails._id);
                    addToWishList(productDetails._id);
                  }}
                  // color="success"
                  variant="contained"
                  startIcon={<FavoriteBorderIcon />}
                >
                  ADD TO WISHLIST
                </Button>
              </div>

              <div className="flex justify-between text-metal text-xl hover:text-grey ">
                <h1>{productDetails.subCategory.toUpperCase()}</h1>
                <h1>{productDetails.sellerTag.toUpperCase()}</h1>
                <h1>{productDetails.gender.toUpperCase()}</h1>
              </div>

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
                  className="flex  justify-between p-2 border w-full rounded-sm bg-bermuda text-white "
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
              <div className="bg-silver  p-2 flex gap-2 flex-col justify-center rounded-md">
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
                    <h4 className="text-metal opacity-60">
                      Rating : {pro.ratings}
                    </h4>
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
    </>
  );
}
