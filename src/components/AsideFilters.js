import React, { useState, useEffect } from "react";
import {
  ShoppingBagOutlinedIcon,
  FavoriteBorderIcon,
  SearchOutlinedIcon,
  AccountBoxIcon,
  PersonPinIcon,
  PersonAddIcon,
  LogoutIcon,
  MoodIcon,
} from "@mui/icons-material";

export const AsideFilters = ({ setList, list }) => {
  console.log("Inside Asise => ", list);

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
        <div className="w-full hidden sm:block md:w-1/4 mt-20 md:mt-0 p-2 rounded-lg bg-gray-100 shadow-lg ml-4 md:ml-0">
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="sortSelect"
            >
              Sort By Price
            </label>
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
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="sortSelect"
            >
              Sort By Rating
            </label>
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
          </div>

          <div className="border-b-4 mb-4 pb-2">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="sizeSelect"
            >
              Sort By Size
            </label>
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
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="genderSelect"
            >
              Sort By Gender
            </label>
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
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="searchByCategoryFilter"
            >
              Filter By Category
            </label>
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
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="searchBySellerTag"
            >
              Filter By Seller Tag
            </label>
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
          </div>
        </div>
      )}
    </>
  );
};
