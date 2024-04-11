import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

export const AsideFilters = ({ setList, list }) => {
  console.log("Inside Asise => ", list);
  const [sortBooleanPrice, setSortBooleanPrice] = useState(true);
  const [sortBooleanRating, setSortBooleanRating] = useState(true);
  const [filterProducts, setFilterProducts] = useState(products);
  const [products, setProducts] = useState([]);
  const [activeDescription, setActiveDescription] = useState(null);

  const [searchByCategoryFilter, setSearchByCategoryFilter] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [getSellerTag, setSellerTag] = useState("");
  const [selectedSort, setSelectedSort] = useState();
  const [selectedRating, setSelectedRating] = useState();

  useEffect(() => {
    // Constructing the API URL based on selected filters
    const filter = {};
    if (selectedSize) filter.size = selectedSize;
    if (selectedGender) filter.gender = selectedGender;
    if (searchByCategoryFilter) filter.subCategory = searchByCategoryFilter;
    if (getSellerTag) filter.sellerTag = getSellerTag;

    const searchApi = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter=${JSON.stringify(
      filter
    )}`;

    fetch(searchApi, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setList(data.data);
        } else {
          alert(`${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
      });
  }, [selectedSize, selectedGender, searchByCategoryFilter, getSellerTag]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSubCategoryChange = (event) => {
    setSearchByCategoryFilter(event.target.value);
  };
  const handleSellerTag = (event) => {
    setSellerTag(event.target.value);
  };
  const handlerSortChange = (event) => {
    const sort = {};
    setSelectedSort(event.target.value);
    if (selectedSort) {
      sort.price = selectedSort;
    }
    const searchApi = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort=${JSON.stringify(
      sort
    )}`;

    fetch(searchApi, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setList(data.data);
        } else {
          alert(`${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
      });
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    const ratings = {};
    if (selectedRating) {
      ratings.ratings = selectedRating;
    }

    const searchApi = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort=${JSON.stringify(
      ratings
    )}`;

    fetch(searchApi, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setList(data.data);
        } else {
          alert(`${data.message}`);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
      });
  };

  return (
    <>
      {products && (
        <div className="w-1/5 h-screen mt-20 p-2 rounded-lg bg-silver shadow-lg ml-[20px]  mt-[35px]">
          <div className="flex flex-col mb-4">
            <dt className="text-sm font-bold mb-2">
              <label htmlFor="sizeSelect">Sort By Price</label>
            </dt>
            <dd>
              <select
                id="sortSelect"
                value={selectedSort}
                onChange={handlerSortChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-200"
              >
                <option value="">--Select Sort--</option>
                <option value={-1}>Low to High</option>
                <option value={1}>High to Low</option>
              </select>
            </dd>
          </div>

          <div className="flex flex-col mb-4">
            <dt className="text-sm font-bold mb-2">
              <label htmlFor="sizeSelect">Sort By Rating</label>
            </dt>
            <dd>
              <select
                id="sortSelect"
                value={selectedRating}
                onChange={handleRatingChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-200"
              >
                <option value="">--Select Rating--</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </dd>
          </div>

          <dl className="border-b-4 p-2 bg-gray-100 rounded-lg">
            <div className="flex flex-col mb-4">
              <dt className="text-sm font-bold mb-2">
                <label htmlFor="sizeSelect">Sort By Size</label>
              </dt>
              <dd>
                <select
                  id="sizeSelect"
                  value={selectedSize}
                  onChange={handleSizeChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-200"
                >
                  <option value="">--Select Size--</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </dd>
            </div>

            <div className="flex flex-col mb-4">
              <dt className="text-sm font-bold mb-2">
                <label htmlFor="genderSelect">Sort By Gender</label>
              </dt>
              <dd>
                <select
                  id="genderSelect"
                  value={selectedGender}
                  onChange={handleGenderChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-200"
                >
                  <option value="">--Select Gender--</option>
                  <option value="Men">MEN</option>
                  <option value="Women">WOMEN</option>
                </select>
              </dd>
            </div>

            <div className="flex flex-col mb-4">
              <dt className="text-sm font-bold mb-2">
                <label htmlFor="searchByCategoryFilter">
                  Filter By Category
                </label>
              </dt>
              <dd>
                <select
                  id="searchByCategoryFilter"
                  value={searchByCategoryFilter}
                  onChange={handleSubCategoryChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-200"
                >
                  <option value="">--Select Category--</option>
                  <option value="tshirt">Tshirt</option>
                  <option value="shirt">Shirt</option>
                  <option value="hoodie">Hoodie</option>
                  <option value="jumpsuit">Jumpsuit</option>
                </select>
              </dd>
            </div>

            <div className="flex flex-col mb-4">
              <dt className="text-sm font-bold mb-2">
                <label htmlFor="searchBySellerTag">Filter By Seller Tag</label>
              </dt>
              <dd>
                <select
                  id="searchBySellerTag"
                  value={getSellerTag}
                  onChange={handleSellerTag}
                  className="w-full px-4 py-2 rounded-lg bg-gray-200"
                >
                  <option value="">--Select Seller Tag--</option>
                  <option value="new arrival">New Arrival</option>
                  <option value="best seller">Best Seller</option>
                  <option value="trending">Trending</option>
                </select>
              </dd>
            </div>
          </dl>
        </div>
      )}
    </>
  );
};
