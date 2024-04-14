import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../Providers/AuthProvider";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export const ConfirmOrderPayment = () => {
  const navigate = useNavigate();
  const { cartItemList, totalAmmount, deleteAllCartItems } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");

  const cardValidationSchema = Yup.object({
    cardNumber: Yup.string()
      .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
      .required("Please enter your card number"),
    expiryDate: Yup.string().required("Expiry date is required"),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
      .required("Please provide the CVV code"),
    cardName: Yup.string().required("Kindly mention the name on the card"),
  });

  const upiValidationSchema = Yup.object({
    upiId: Yup.string()
      .matches(/^[\w.-]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/, "Invalid UPI ID")
      .required("UPI ID is required"),
  });

  const codValidationSchema = Yup.object({});

  const handleSubmit = (values) => {
    console.log(values); // You can handle form submission here
    deleteAllCartItems();
    navigate("/paymentprocess/confirmorderpayment/orderconfirmgreetingPage");
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Choose Your Payment Mode</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Formik
          initialValues={{
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            cardName: "",
            upiId: "",
          }}
          validationSchema={
            paymentMethod === "card"
              ? cardValidationSchema
              : paymentMethod === "upi"
              ? upiValidationSchema
              : codValidationSchema
          }
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full md:w-2/3 border rounded-lg border-gray-300 p-4">
              <h2 className="text-lg font-semibold mb-4">Payment Options:</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Field
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="card" className="ml-2">
                    Debit & Credit Card
                  </label>
                </div>

                <div className="flex items-center">
                  <Field
                    placeholder="id must be contain '@' ,'.'"
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="upi" className="ml-2">
                    UPI
                  </label>
                </div>

                <div className="flex items-center">
                  <Field
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="cod" className="ml-2">
                    Cash On Delivery
                  </label>
                </div>
              </div>

              {paymentMethod === "card" && (
                <>
                  <Field
                    className="w-full border rounded p-2 mb-2"
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                  />
                  <ErrorMessage
                    name="cardNumber"
                    component="div"
                    className="text-red-500"
                  />
                  <div className="flex mb-2">
                    <Field
                      className="w-1/2 border rounded p-2 mr-2"
                      type="text"
                      name="expiryDate"
                      placeholder="Valid Through (MM/YY)"
                    />
                    <ErrorMessage
                      name="expiryDate"
                      component="div"
                      className="text-red-500"
                    />
                    <Field
                      className="w-1/2 border rounded p-2"
                      name="cvv"
                      type="text"
                      placeholder="CVV"
                    />
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <Field
                    className="w-full border rounded p-2"
                    type="text"
                    name="cardName"
                    placeholder="Name On Card"
                  />
                  <ErrorMessage
                    name="cardName"
                    component="div"
                    className="text-red-500"
                  />
                </>
              )}

              {paymentMethod === "upi" && (
                <Field
                  className="w-full border rounded p-2 mb-2"
                  type="text"
                  name="upiId"
                  placeholder="UPI ID"
                />
              )}

              <button
                type="submit"
                className={`py-3 px-6 rounded-full mt-6 w-full font-bold hover:bg-blue-600 ${
                  paymentMethod
                    ? "bg-blue-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                Confirm Payment
              </button>
            </Form>
          )}
        </Formik>

        <div className="w-full md:w-1/3 border-l-0 md:border-l border-gray-300 p-4">
          <h2 className="text-lg font-semibold bg-slate-600 p-1 text-white mb-4">
            Order Summary :
          </h2>
          <div className="mb-4">
            {cartItemList.map((item, index) => (
              <div key={item.id} className="flex justify-between mb-2">
                <p>
                  {<RadioButtonCheckedIcon color="success" />}{" "}
                  {item.product.name}
                </p>
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
            <p>
              {totalAmmount === 0 ? "-" : totalAmmount > 2000 ? "free" : "₹49"}
            </p>
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
  );
};
