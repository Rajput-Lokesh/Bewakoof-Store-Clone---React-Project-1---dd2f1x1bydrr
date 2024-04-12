import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

export const ConfirmOrderPayment = () => {
  const { cartItemList, totalAmmount } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto absolute top-[8rem] px-4">
      <h1 className="text-2xl font-bold mb-6">Choose Your Payment Mode</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 border rounded-lg border-gray-300 p-4">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold mb-4">Payment Options:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input type="radio" id="card" name="payment" value="card" />
                <label htmlFor="card" className="ml-2">
                  Debit & Credit Card
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="wallet" name="payment" value="wallet" />
                <label htmlFor="wallet" className="ml-2">
                  Wallet
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="upi" name="payment" value="upi" />
                <label htmlFor="upi" className="ml-2">
                  UPI
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="netbanking"
                  name="payment"
                  value="netbanking"
                />
                <label htmlFor="netbanking" className="ml-2">
                  Net Banking
                </label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="cod" name="payment" value="cod" />
                <label htmlFor="cod" className="ml-2">
                  Cash On Delivery
                </label>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <img
              className="h-20 mx-auto mb-4"
              src="https://cdn.webshopapp.com/shops/218525/files/371942398/payment-methods-epicerie-ludo.png"
              alt="Payment Methods"
            />
            <input
              className="w-full border rounded p-2 mb-2"
              type="text"
              placeholder="Card Number"
            />
            <div className="flex mb-2">
              <input
                className="w-1/2 border rounded p-2 mr-2"
                type="text"
                placeholder="Valid Through (MM/YY)"
              />
              <input
                className="w-1/2 border rounded p-2"
                type="text"
                placeholder="CVV"
              />
            </div>
            <input
              className="w-full border rounded p-2"
              type="text"
              placeholder="Name On Card"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 border-l-0 md:border-l border-gray-300 p-4">
          <h2 className="text-lg font-semibold mb-4">Deliver Order To:</h2>
          <div className="flex items-center mb-4">
            <img
              className="w-12 h-12 mr-4"
              src="https://images.bewakoof.com/uploads/grid/app/category-icon-Desktop-common--1--1706616684.gif"
              alt="Location Icon"
            />
            <p>
              kbsdksjbdjkbjkbsdkbfkbwkjfbwejkbjkjhb
              <span className="text-green">Lokesh</span>
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Price Summary:</h2>
            <div className="mb-4">
              {cartItemList.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <p>{item.product.name}</p>
                  <p>₹{item.product.price * 0.75}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t border-gray-400 pt-2">
              <p>Total MRP (Incl. of taxes)</p>
              <p>₹{totalAmmount}</p>
            </div>
            <div className="flex justify-between border-t border-gray-400 pt-2">
              <p>Delivery Fee</p>
              <p>{totalAmmount > 2000 ? "free" : "₹49"}</p>
            </div>
            <div className="flex justify-between border-t border-gray-400 pt-2">
              <p>Bag Discount</p>
              <p>₹{totalAmmount - totalAmmount * 0.25}</p>
            </div>
            <div className="flex justify-between border-t border-gray-400 pt-2">
              <p>Sub Total</p>
              <p>₹{totalAmmount * 0.75}</p>
            </div>
            <div className="flex justify-between border-t border-gray-400 pt-2">
              <p>Final amount</p>
              <p>₹{totalAmmount * 0.75}</p>
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
        className="bg-blue-500 text-white font-bold py-3 px-6 rounded-full mt-6 w-full hover:bg-blue-600"
      >
        Confirm Payment
      </button>
    </div>
  );
};
