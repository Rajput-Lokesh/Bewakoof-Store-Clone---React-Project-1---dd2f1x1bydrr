import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

export const ConfirmOrderPayment = () => {
  const { cartItemList, totalAmmount } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="m-[10rem] ">
        <div className="flex gap-1 ">
          <div className=" w-2/3">
            <h1 className="p-3">Choose Your Payment Mode</h1>
            <div className="flex p-3 border rounded-lg border-grey m-1">
              <div className="bg-lightGrey w-1/3 flex flex-col gap-6 p-2 divide-y divide-grey ">
                <div className="p-1">Debit & Credit Card</div>
                <div className="p-1">Wallet</div>
                <div className="p-1">UPI</div>
                <div className="p-1">Net Banking</div>
                <div className="p-1">Cash On Delivery</div>
              </div>
              <div className=" w-2/3 flex flex-col gap-[60px] p-2 divide-y divide-grey">
                <div className="flex justify-center">
                  <img
                    className="h-[5rem]"
                    src="https://cdn.webshopapp.com/shops/218525/files/371942398/payment-methods-epicerie-ludo.png"
                  />
                </div>
                <input
                  className="outline-none pt-[2rem]"
                  placeholder="Card Number"
                />
                <div className="flex justify-between pt-[2rem]   ">
                  <input
                    placeholder="Valid Through (MM/YY)"
                    className="outline-none"
                  />
                  <input className="outline-none pt-[2rem]" placeholder="CVV" />
                </div>
                <input
                  className="outline-none pt-[2rem]"
                  placeholder="Name On Card"
                />
              </div>
            </div>
          </div>
          <div className="divide-y w-1/3 border-l-4 border-grey p-2  flex flex-col gap-1">
            <h1 className="border-b-1">Deliver Order To :</h1>
            <div className="p-2 flex flex-col gap-2 ">
              <h1>You are paying for these address</h1>
              <div className="flex gap-4">
                <img
                  className="w-[3rem]"
                  src="https://images.bewakoof.com/uploads/grid/app/category-icon-Desktop-common--1--1706616684.gif"
                />
                <p>
                  kbsdksjbdjkbjkbsdkbfkbwkjfbwejkbjkjhb
                  <span className="text-green">Lokesh</span>
                </p>
              </div>
            </div>

            <div className="w-full mt-1 h-fit">
              <h1 className="  p-2  border-black ">PRICE SUMMRY</h1>

              <div className="p-2  border-b-2 ">
                <div className="flex justify-between mb-[10px] ">
                  <p>Total MRP (Incl. of taxes) </p>
                  <p>
                    <p>₹{totalAmmount}</p>
                  </p>
                </div>
                <div className="flex justify-between mb-[10px]">
                  {" "}
                  <p>Delivery Fee </p>
                  <p
                    className={`text-${
                      totalAmmount > 2000 ? "green" : "metal"
                    } text-xl`}
                  >
                    {totalAmmount > 2000 ? "free" : "₹49"}
                  </p>
                </div>
                <div className="flex justify-between mb-[10px]">
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
                <div className="flex justify-between mb-[10px]">
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
              <div className="flex justify-between items-center text-xl p-2">
                <p>Final amount</p>
                <p className="text-bold ">
                  ₹
                  {cartItemList.reduce(
                    (totalDiscount, item) =>
                      totalDiscount + item.product.price * 0.75,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            navigate(
              "/paymentprocess/confirmorderpayment/orderconfirmgreetingPage"
            )
          }
          className="bg-bewBtn text-white font-bold  w-full p-3 rounded-b-md hover:text-black"
        >
          Confirm Payment
        </button>
      </div>
    </>
  );
};
