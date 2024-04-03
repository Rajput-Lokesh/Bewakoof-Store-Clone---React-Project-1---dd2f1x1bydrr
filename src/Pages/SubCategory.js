import React, { useEffect, useState } from "react";
import { SingleProductCard } from "../components/SingleProductCard";
import { useParams } from "react-router-dom";

export const SubCategory = () => {
  const { type } = useParams();
  console.log("I  m from SUb cat");
  console.log(type);

  const [ProductList, setProductList] = useState([]);

  const url = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"subCategory":"${type}"}`;
  const handleProductList = async () => {
    const responce = await fetch(
      // `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products`,
      url,
      {
        method: "GET",
        headers: {
          projectId: "gar9pityowqx",
        },
      }
    );
    const parseData = await responce.json();
    console.log(parseData.data);
    if (responce.status >= 400) {
      console.log(parseData.message || "Product not Found");
      return;
    }
    setProductList(parseData.data);
  };
  useEffect(() => {
    if (type) {
      handleProductList();
    }
  }, [type]);
  return (
    <>
      <div style={{ position: "absolute", top: "100px" }}>
        <h1 className="text-2xl text-center">{type.toLocaleUpperCase()}</h1>
        <div className="flex flex-wrap justify-around">
          {ProductList &&
            ProductList.map((product, index) => (
              <SingleProductCard product={product} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};
