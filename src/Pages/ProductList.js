import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useAuth } from "../Providers/AuthProvider";

export const ProductList = () => {
  const { API_BASE_URL, getSearchProdct, getGender } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [getError, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const subCategory = searchParams.get("type");

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [initialApiCallMade, setInitialApiCallMade] = useState(false);

  const fetchData = async () => {
    if (isFetching || (initialApiCallMade && page > 1)) {
      return;
    }

    try {
      setIsFetching(true);
      console.log("page number ", page);

      const res = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?limit=20&page=${page}&gender=${getGender}`,
        {
          headers: {
            projectId: "gar9pityowqx",
          },
        }
      );

      setProducts((prevData) => [...prevData, ...res.data.data]);

      // Only increment page if it's not the initial call
      if (!initialApiCallMade) {
        setInitialApiCallMade(true);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedFetchData = debounce(fetchData, 500);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      debouncedFetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const searchApi = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?search={"name":"${getSearchProdct}"}`;

    fetch(searchApi, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
      });
  }, [getSearchProdct]);

  const xyzFun = () => {
    let productUrl = `${API_BASE_URL}/api/v1/ecommerce/clothes/products?filter=`;
    const subPath1 = `{"gender":"${getGender}"}`;

    const subPath2 = `{"gender":"${getGender}", "subCategory":"${subCategory}"}`;

    if (subCategory) {
      productUrl = productUrl + subPath2;
    } else {
      productUrl = productUrl + subPath1;
    }

    fetch(productUrl, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    xyzFun();
  }, []);

  useEffect(() => {
    xyzFun();
  }, [getGender, subCategory]);

  return (
    <>
      {getError ? <div>{getError}</div> : null}
      <div className="flex" style={{ position: "absolute", top: "100px" }}>
        <div
          className="w-[20%] h-screen mt-[90px] p-2"
          style={{ background: "gray" }}
        >
          <select className="w-full">
            <option>Men</option>
            <option>Women</option>
          </select>
          <select className="w-full">
            <option value="" disabled selected>
              Men
            </option>
            <option>Tshirt</option>
            <option>Truoser</option>
            <option>Shirt</option>
            <option>Joggers</option>
          </select>

          <select className="w-full">
            <option value="" disabled selected>
              Women
            </option>
            <option>Tshirt</option>
            <option>Shorts</option>
            <option>Capri</option>
            <option>Joggers</option>
          </select>
        </div>

        <div className="w-[80%]">
          <h1 className="text-center text-3xl my-1">
            {getGender} Product List
          </h1>
          <div className="flex flex-wrap justify-around bg-slate-700 p-4 ">
            {products ? (
              products.map((product, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    maxWidth: "24%",
                    margin: "5px",
                    height: "",
                  }}
                >
                  <img
                    className="cursor-pointer"
                    onClick={() => {
                      // alert(product._id);
                      navigate(`/productlist/productdetails/${product._id}`);
                    }}
                    width="450px"
                    src={product.displayImage}
                    alt={product.name}
                  />
                  <p
                    style={{
                      position: "absolute",
                      top: "0px",
                      background: "gray",
                    }}
                  >
                    PLUS_SIZE
                  </p>
                  <div
                    style={{ position: "absolute", bottom: "270px" }}
                    className="flex"
                  >
                    <StarIcon color="success" />
                    <div className="text-slate-400">
                      {product.ratings.toFixed(2)}
                    </div>
                  </div>
                  <p className="flex justify-between">
                    <b>Bewakoof®</b> <FavoriteBorderIcon />
                  </p>
                  <p>{product.name}</p>
                  <p>{product.subCategory}</p>
                  <p>
                    <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                    {product.price}{" "}
                    <span className="text-sm line-through">
                      {product.price * 2}
                    </span>
                  </p>
                  <button className="border rounded-md bg-bermuda text-white my-1 p-1">
                    <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                    {product.price - 50}
                    {" for tribe members"}
                  </button>
                  <Button
                    style={{
                      padding: "5px",
                      borderTop: "1px solid black",
                      borderLeft: "1px solid black",
                      borderRight: "1px solid black",
                      width: "100%",
                    }}
                  >
                    VICOUS RYAN
                  </Button>
                </div>
              ))
            ) : (
              <div>No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
