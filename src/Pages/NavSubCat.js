import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

const NavCat = () => {
  const [getCategories, setCategories] = useState([]);
  const { API_BASE_URL } = useAuth();
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
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(`/productlist?type=${selectedCategory}`);
    }
  };

  const navi = (subCategory) => {
    navigate(`/productlist?type=${subCategory}`);
  };

  return (
    <div>
      <div>
        {/* Navbar for larger devices */}
        <nav className="flex fixed w-full top-[70px] bg-white z-30 justify-between items-center py-2 px-4 border-b-2">
          {getCategories.map((catName, index) => (
            <p
              className="cursor-pointer text-lg text-gray-700 hover:text-black"
              key={index}
              onClick={() => {
                navi(catName);
              }}
            >
              {catName.toUpperCase()}
            </p>
          ))}
        </nav>

        {/* Dropdown navbar for smaller devices */}
        <nav className="flex md:hidden fixed w-full top-[70px] bg-white z-30 justify-center items-center py-2 px-4 border-b-2">
          <select
            className="outline-none"
            onChange={handleCategoryChange}
            defaultValue=""
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            {getCategories.map((catName, index) => (
              <option value={catName} key={index}>
                {catName.toUpperCase()}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </div>
  );
};

export default NavCat;
