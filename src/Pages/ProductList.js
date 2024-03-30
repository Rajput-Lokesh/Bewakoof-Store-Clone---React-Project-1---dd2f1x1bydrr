import React from "react";
import { useAuth } from "../Providers/AuthProvider";

export const ProductList = () => {
  const { getCategoryImageObject } = useAuth();

  return (
    <>
      <img src={getCategoryImageObject.jogger} />
    </>
  );
};
