import React from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../Providers/AuthProvider";

export const Modal = ({ isOpen }) => {
  const { orderHistory } = useAuth();
  console.log("Inside Modal");
  console.log(orderHistory);
  console.log(orderHistory[0].order.items[0].product.displayImage);
  console.log(orderHistory[0].order.shipmentDetails);
  console.log(orderHistory[0].order.totalPrice);

  return ReactDOM.createPortal(
    <>
      <div className="absolute top-[150px] bottom-0 left-0 right-0 grid justify-center items-center bg-transparent">
        <div
          className="p-6  bg-slate-200 rounded-lg min-h-80 m-4 relative min-w-[500px] shadow-lg"
          style={{ maxHeight: "80vh", overflowY: "auto" }} // Added styles for scrollbar
        >
          <div className="flex justify-between items-center px-4 py-2 rounded-lg bg-gray-800 text-white mb-3">
            <h1 className="text-xl font-semibold">Order History Page...</h1>
            <button
              className="bg-sky-400 w-10 h-10 rounded-lg hover:text-white font-bold flex justify-center items-center"
              onClick={() => isOpen()}
            >
              X
            </button>
          </div>

          <div className="flex gap-3 flex-wrap justify-center">
            {orderHistory.map((order) => {
              return (
                <>
                  <div
                    key={order.order._id}
                    className="border border-slate-500 w-[23%] p-4 rounded-lg"
                  >
                    <img
                      className="w-full h-auto mb-4 rounded-lg"
                      src={order.order.items[0].product.displayImage}
                      alt={order.order.items[0].product.name}
                    />
                    <p className="text-xs mb-2">
                      Order Date: {order.createdAt}
                    </p>
                    {/* <h1 className="text-md font-semibold mb-1">
                      Name : {order.order.items[0].product.name}
                    </h1> */}
                    {/* <h1 className="text-lg mb-1">
                      Price: {order.order.items[0].product.price}
                    </h1> */}
                    {/* <h1 className="text-md mb-1">
                      Total Price: {order.order.totalPrice}
                    </h1> */}
                    <h1 className="text-sm mb-1">
                      Product ID: {order.order.items[0].product._id}
                    </h1>
                    <h1 className="text-sm mb-1">
                      Order ID: {order.order._id}
                    </h1>

                    {/* <div>
                      <h1 className="text-lg font-semibold">
                        Shipping Details
                      </h1>
                      <h1 className="text-lg">
                        Type: {order.order.shipmentDetails?.type}
                      </h1>
                      <h1 className="text-lg">
                        Address: {order.order.shipmentDetails?.address?.street},{" "}
                        {order.order.shipmentDetails?.address?.city},{" "}
                        {order.order.shipmentDetails?.address?.country},{" "}
                        {order.order.shipmentDetails?.address?.state}{" "}
                        {order.order.shipmentDetails?.address?.zipCode}
                      </h1>
                    </div> */}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal-root")
  );
};
