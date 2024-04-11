import React from "react";
import { useNavigate } from "react-router-dom";

export const ConfirmOrderPayment = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="mt-[200px]">Confirm Payment Page</h1>
      <button
        onClick={() => navigate("/paymentprocess/confirmorderpayment")}
        className="bg-bewBtn text-white font-bold  w-full p-3 rounded-b-md hover:text-black"
      >
        Confirm Payment
      </button>
    </>
  );
};
