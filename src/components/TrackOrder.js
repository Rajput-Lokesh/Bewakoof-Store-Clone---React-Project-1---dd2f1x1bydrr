import React, { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import axios from "axios";
import { Modal } from "../Portals/PortalM";

export function TrackOrder() {
  const { orderCreatedResponse, orderHistory, setOrderHistory } = useAuth();
  const [getOrderProduct, setOrderProduct] = useState();
  console.log("Order Created Response");
  console.log(orderCreatedResponse);

  // Order history APi Call

  // const getOrderHistory = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/ecommerce/order/`,
  //       {
  //         headers: {
  //           projectId: "gar9pityowqx",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log("Order History");
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   // getOrderHistory();
  //   getHistory();
  // }, []);

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/order/`,
        {
          headers: {
            projectId: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Get Order Details...");
      console.log(response);
      console.log(response.data);
      console.log(response.data.data);
      setOrderHistory(response.data.data);
      setOrderProduct(response.data.data.items[0]);
    } catch (err) {
      console.log("Inside catch Block");
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  // Modal Purpose
  const [open, setopen] = useState(false);

  const handleOpenModal = () => {
    setopen(!open);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[60px]">
      {open && <Modal isOpen={handleOpenModal} />}
      <div>
        <button
          className="bg-sky-200 rounded-lg px-4 py-1 text-slate-400 font-bold"
          onClick={() => setopen(!open)}
        >
          Order History
        </button>
      </div>

      <img
        className="w-full md:max-w-lg mx-auto mb-8"
        src="https://sanfe.in/cdn/shop/files/Track-your-order.jpg?v=1614253167&width=1600"
        alt="Track your order"
      />
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-xl font-bold mb-4">
          {/* {orderCreatedResponse.status} */}
        </h1>
        <h1 className="text-lg font-semibold mb-2">
          {/* Order Price: {orderCreatedResponse.totalPrice} */}
        </h1>

        <div className="my-6">
          <h1 className="text-lg font-semibold mb-2">Order Details</h1>
          <p className="mb-2">
            {/* Product: {orderCreatedResponse.items[0].product} */}
          </p>
          {/* <p className="mb-2">Size: {orderCreatedResponse.items[0].size}</p> */}
          <p className="mb-2">
            {/* Quantity: {orderCreatedResponse.items[0].quantity} */}
          </p>
        </div>

        {/* <div>
          <h1 className="text-lg font-semibold mb-2">Shipping Details</h1>
          <div>
            <p className="mb-1">Order Date: {orderCreatedResponse.orderDate}</p>
            <p className="mb-1">
              Shipment Type: {orderCreatedResponse.shipmentDetails.type}
            </p>
            <p className="mb-1">
              Country: {orderCreatedResponse.shipmentDetails.address.country}
            </p>
            <p className="mb-1">
              City: {orderCreatedResponse.shipmentDetails.address.city}
            </p>
            <p className="mb-1">
              Street: {orderCreatedResponse.shipmentDetails.address.street}
            </p>
            <p className="mb-1">
              Zip Code: {orderCreatedResponse.shipmentDetails.address.zipCode}
            </p>
            <p className="mb-1">
              State: {orderCreatedResponse.shipmentDetails.address.state}
            </p>
          </div>
        </div>

        <div>
          <h1>My Orders</h1>
          <div>{getOrderProduct.product.brand}</div>
        </div> */}
      </div>
    </div>
  );
}
