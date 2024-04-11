import React, { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useAuth } from "../Providers/AuthProvider";
import { SingleProductCard } from "../components/SingleProductCard";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useNavigate } from "react-router-dom";
import { Address } from "./Address";
import { Carousel } from "primereact/carousel";
import { InputText } from "primereact/inputtext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { responsiveOptions } from "../utilStaticData/StaticData";
import axios from "axios";

export const AddToCart = () => {
  const navigate = useNavigate();
  const {
    wishlistItems,
    cartItemList,
    cartItemCount,
    getProductQuntityInAddToCart,
    addToWishList,
    totalAmmount,
    addToCart,
    fetchWishList,
    fetchCartItems,
  } = useAuth();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const bestSellerProTemplate = (product) => {
    return (
      <>
        <SingleProductCard product={product} />
      </>
    );
  };

  const deleteCartItems = async (id) => {
    // alert(id);
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data.status);
      if (response.status === "success" || response.status === 200) {
        fetchCartItems();
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAllCartItems = async () => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
      if (response.status === "success" || response.status === 200) {
        fetchCartItems();
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="relative top-[130px] ">
        <h1 className="bg-bermuda text-center  mx-[130px]  text-xl font-bold text-white p-2 border">
          {/* MY BAG ----------- ADDRESS ----------- PAYMENT */}
          My Bag {cartItemCount} item and Total amount {totalAmmount} and
          Quantity of product {getProductQuntityInAddToCart}
        </h1>

        <div className="flex justify-center mx-[130px] gap-1  text-xl">
          <div className=" w-3/4 bg-bewYellow items-center rounded-md p-3 my-2 flex justify-between">
            <div className="card flex justify-content-center">
              <Button
                className="bg-bermuda px-5 py-1 rounded-lg"
                label="Show"
                icon="pi pi-external-link"
                onClick={() => setVisible(true)}
              />
              <Dialog
                height={"40vh"}
                className="border bg-silver p-3 rounded-xl"
                header="Add New Address"
                visible={visible}
                style={{ width: "50vw" }}
                onHide={() => setVisible(false)}
                // blockScroll={false}
                // modal={false}
              >
                <Address />
              </Dialog>
            </div>
          </div>
          <div className=" w-1/2 bg-bewYellow rounded-md p-3 my-2 flex justify-between items-center">
            <h1>Click here to clear cart {">>"}</h1>
            <button
              className="bg-bermuda py-1 px-5 rounded-md  hover:bg-red"
              onClick={deleteAllCartItems}
            >
              <DeleteForeverIcon /> Clear Cart
            </button>
          </div>
        </div>

        {/* Product ADD TO BAG START */}
        <div className="md:flex  justify-center gap-1 ">
          <div className="md:flex-col w-1/2 flex-wrap ">
            {cartItemList &&
              cartItemList.map((product) => (
                <div className="md:flex-col shadow-md border rounded-lg mb-2">
                  <div className="flex p-[30px] justify-between">
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

          <div className="bg-silver  w-1/3 h-fit ">
            <p className="bg-silver border hover:text-bewYellow p-2 text-lg opacity-60  border-black mb-[15px]">
              Whistles! Get extra 15% cashback on prepaid orders above Rs.699.
              Coupon code - PARTY
            </p>

            <div className="m-2 p-1 text-midnight rounded-lg  bg-[#87CEFA]">
              <p>Apply Coupon // Gift Card // Refferel</p>
            </div>
            <h1 className="bg-grey border p-2  border-black mb-[15px]">
              PRICE SUMMRY
            </h1>

            <div className="p-2 border-b-2 ">
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

            <div className="flex justify-between p-2">
              <div>
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
              <Button onClick={() => navigate("/address")} variant="contained">
                ADD ADDRESS
              </Button>
            </div>
            <div className="flex justify-between text-sm ">
              <div className=" flex flex-col justify-center items-center ">
                <img
                  className="w-[50px]"
                  src="https://images.bewakoof.com/web/cart-badge-trust.svg"
                />
                <p>100% SECURE PAYMENTS</p>
              </div>
              <div className=" flex flex-col justify-center items-center ">
                <img
                  className="w-[50px]"
                  src="https://images.bewakoof.com/web/cart-easy-return.svg"
                />
                <p>EASY RETURNS & QUICK REFUNDS</p>
              </div>
              <div className=" flex flex-col justify-center items-center ">
                <img
                  className="w-[50px]"
                  src="https://images.bewakoof.com/web/quality-check.svg"
                />
                <p>QUALITY ASSURANCE</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" mx-[120px]">
          <h1 className=" text-xl m-[20px] font-bold">
            Want to add more from your wishlist..
          </h1>

          <Carousel
            value={wishlistItems}
            numVisible={5}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={bestSellerProTemplate}
          />
        </div>
      </div>
    </>
  );
};
