import React, { useEffect } from "react";
import { useAuth } from "../Providers/AuthProvider";
import axios from "axios";
import { SingleProductCard } from "../components/SingleProductCard";

export const WishList = () => {
  const { wishlistItems, fetchWishList, wishListCount } = useAuth();

  useEffect(() => {
    fetchWishList();
  }, []);

  const deleteAllWishListItems = async () => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      if (response.status === "success" || response.status === 200) {
        fetchWishList();
        alert(response.data.message);
      }
    } catch (err) {}
  };

  return (
    <>
      {" "}
      <div className="relative top-[130px]">
        <div className="flex bg-silver justify-between px-5 py-1">
          <h1
            className={`flex justify-center text-2xl  flex-wrap gap-4  ${
              localStorage.getItem("token")
                ? "text-green bg-silver text-bold hover:text-black"
                : "text-red bg-black hover:text-white text-bold"
            }`}
          >
            {localStorage.getItem("token")
              ? wishListCount
                ? `Wish List Count : ${wishListCount}`
                : "Your Wishlist is Empty...!"
              : "Please Login to View Your Wishlist...!"}
            {}
          </h1>
          <button
            className="bg-[#42a2a2] text-white font-bold py-2 flex justify-between px-5 rounded-md  hover:text-black"
            onClick={deleteAllWishListItems}
          >
            Clear Wishlist
          </button>
        </div>
        <div className="flex flex-wrap gap-1 mt-4 justify-center ">
          {wishlistItems.map((product) => (
            <SingleProductCard product={product} />
          ))}
        </div>
      </div>
    </>
  );
};
