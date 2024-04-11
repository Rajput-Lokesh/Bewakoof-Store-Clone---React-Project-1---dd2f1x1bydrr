import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const NavCat = () => {
  const [getCategories, setCategories] = useState([]);
  const { API_BASE_URL, getGender } = useAuth();
  let navigate = useNavigate();

  const catUrl = `${API_BASE_URL}/api/v1/ecommerce/clothes/categories`;

  useEffect(() => {
    fetch(catUrl, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        // console.error("Error fetching products:", error);
      });
  }, []);

  const navi = (subCategory) => {
    navigate(`/productlist?type=${subCategory}`);
  };

  return (
    <div>
      <nav className="flex fixed w-full top-[80px] bg-white z-30 justify-evenly items-center py-[5px] px-[100px] border-b-[2px]">
        {getCategories.map((catName, index) => (
          <p
            className="cursor-pointer"
            key={index}
            onClick={() => {
              navi(catName);
            }}
          >
            {catName.toUpperCase()}
          </p>
        ))}
      </nav>
    </div>
  );
};

export default NavCat;
