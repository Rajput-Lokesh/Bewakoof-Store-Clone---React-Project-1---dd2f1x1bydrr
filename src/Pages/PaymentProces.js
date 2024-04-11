import React from "react";
import { useAuth } from "../Providers/AuthProvider";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const PaymentProcess = () => {
  const navigate = useNavigate();
  const { cartItemList, totalAmmount } = useAuth();
  console.log(cartItemList);
  const userAddDetails = JSON.parse(localStorage.getItem("userAddressDetails"));

  return (
    <>
      <div className="mt-[200px] w-[70%] mx-auto flex flex-col gap-3 bg-grey p-6">
        <div className="bg-silver p-5 border rounded-md">
          <div className="flex justify-start gap-5 items-center">
            <h1>Delivery Address </h1>
            <p className="border max-w-fit px-4 rounded">
              {userAddDetails.addressType}
            </p>
          </div>
          <p>{`${userAddDetails.landmark}, ${userAddDetails.area}, ${userAddDetails.city}, ${userAddDetails.state}, ${userAddDetails.country}`}</p>

          <p>{userAddDetails.zipCode}</p>
        </div>

        <div className="bg-silver p-5 border rounded-md">
          <h2>Contact info</h2>
          <p>{userAddDetails.phone}</p>
        </div>

        <div className="flex w-full gap-2">
          <div className="md:flex-col w-1/2 flex-wrap ">
            {cartItemList &&
              cartItemList.map((product) => (
                <div className="md:flex-col shadow-md border  rounded-lg mb-2">
                  <div className="flex bg-silver p-[30px] justify-between">
                    <div>
                      <p className="text-2xl mb-3">{product.product.name}</p>
                      <p className="mb-3 text-3xl">
                        <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                        {product.product.price}{" "}
                        <span className="text-sm line-through">
                          {product.product.price * 2}
                        </span>
                      </p>
                      <div className="text-green flex gap-1">
                        <h1> You saved</h1>
                        <span className="font-bold text-xl">
                          <CurrencyRupeeIcon style={{ fontSize: "20px" }} />
                          {product.product.price * 1.75 - product.product.price}
                        </span>
                      </div>
                      <div className="m-1 flex gap-2">
                        <div className="border rounded-md p-1 flex justify-center items-center">
                          <label>SIZE :</label>
                          {product.size}
                        </div>

                        <div className="border rounded-md p-1 flex justify-center items-center">
                          <label>Quantity :</label>
                          {product.quantity}
                        </div>
                      </div>
                    </div>
                    <div>
                      <img
                        className="w-[150px] rounded-lg"
                        src={product.product.displayImage}
                        alt={product.product.name}
                      />
                    </div>
                  </div>

                  <div className="md:flex gap-1 text-black justify-between p-[30px]">
                    <Button
                      onClick={() => deleteCartItems(product.product._id)}
                      variant="outlined"
                      color="inherit"
                      startIcon={<DeleteForeverOutlinedIcon />}
                    >
                      REMOVE
                    </Button>
                    <Button
                      onClick={() => {
                        addToWishList(product.product._id);
                        deleteCartItems(product.product._id);
                      }}
                      variant="outlined"
                      color="inherit"
                      startIcon={<FavoriteBorderIcon />}
                    >
                      MOVE TO WISHLIST
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          <div className="w-1/2  h-fit">
            <h1 className="bg-silver border p-2  border-black mb-[15px]">
              PRICE SUMMRY
            </h1>

            <div className="p-2 bg-silver border-b-2 ">
              <div className="flex justify-between mb-[15px] ">
                <p>Total MRP (Incl. of taxes) </p>
                <p>
                  <p>₹{totalAmmount}</p>
                </p>
              </div>
              <div className="flex justify-between mb-[15px]">
                {" "}
                <p>Delivery Fee </p>
                <p
                  className={`text-${
                    totalAmmount > 2000 ? "green" : "white"
                  } text-xl`}
                >
                  {totalAmmount > 2000
                    ? "free"
                    : "₹49 - to get delivery order shoud be above 2000"}
                </p>
              </div>
              <div className="flex justify-between mb-[15px]">
                <p>Bag Discount </p>
                <p>
                  ₹
                  {totalAmmount -
                    cartItemList.reduce(
                      (totalDiscount, item) =>
                        totalDiscount + item.product.price * 0.75,
                      0
                    )}
                </p>
              </div>
              <div className="flex justify-between mb-[15px]">
                <p>Sub Total </p>
                <p>
                  ₹{" "}
                  {cartItemList.reduce(
                    (totalDiscount, item) =>
                      totalDiscount + item.product.price * 0.75,
                    0
                  )}
                </p>
              </div>
            </div>
            <div className="bg-silver">
              <p>Total</p>
              <p className="text-bold text-2xl">
                ₹
                {cartItemList.reduce(
                  (totalDiscount, item) =>
                    totalDiscount + item.product.price * 0.75,
                  0
                )}
              </p>
            </div>
            <button
              onClick={() =>
                navigate(
                  "/paymentprocess/confirmorderpayment/orderconfirmgreetingPage"
                )
              }
              className="bg-bewBtn text-white font-bold  w-full p-3 rounded-b-md hover:text-black"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
