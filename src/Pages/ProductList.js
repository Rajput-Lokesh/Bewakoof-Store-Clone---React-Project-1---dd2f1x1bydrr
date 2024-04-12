import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getRequestForPegination } from "../apiServices/ApiCallBewkoof";
import { useAuth } from "../Providers/AuthProvider";
import { AsideFilters } from "../components/AsideFilters";
import { SingleProductCard } from "../components/SingleProductCard";

export const ProductList = () => {
  const { API_BASE_URL, getSearchProdct, getGender, setGender } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [getError, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const subCategory = searchParams.get("type");

  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    if (isFetching) {
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

      setPage((prevPage) => prevPage + 1); // Update page here
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
  }, [handleScroll]);

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
        if (data.status === "fail") {
          navigate("*");
        }
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

  // Filter Sort bye price or sort by rating

  return (
    <>
      {getError ? <div>{getError}</div> : null}
      <div className=" flex justify-center w-full  mt-[7rem]">
        <AsideFilters list={products} setList={setProducts} />

        <div className="w-[80%] sm:w-[100%]">
          <div className="flex flex-col flex-wrap md:flex-row items-center justify-evenly bg-slate-50 ">
            {products ? (
              products.map((product, index) => (
                <div
                  className="relative sm:w-[100%] md:max-w-[23%] max-w-[100%] max-h-full m-1 shadow-lg rounded-[20px] "
                  key={index}
                >
                  <img
                    className="cursor-pointer rounded-t-lg w-[100%] hover:opacity-60"
                    onClick={() => {
                      navigate(`/productlist/productdetails/${product._id}`);
                    }}
                    src={product.displayImage}
                    alt={product.name}
                  />
                  <p className="absolute top-[0px] bg-slate-500 py-[2px] px-[6px] rounded-br-lg rounded-tl-lg">
                    PLUS_SIZE
                  </p>
                  <div className="absolute bottom-[13rem] flex">
                    <StarIcon className="text-amber-500" />
                    <div className="text-slate-100">
                      {product.ratings.toFixed(2)}
                    </div>
                  </div>
                  <p className="flex justify-between">
                    <b>Bewakoof®</b>
                    {/* <FavoriteBorderIcon /> */}
                  </p>
                  <div className="h-[3rem]">
                    <p>{product.name}</p>
                  </div>
                  <p className="text-slate-500">
                    Category : {product.subCategory}
                  </p>
                  <p>
                    <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                    {product.price}{" "}
                    <span className="text-sm line-through">
                      {product.price * 2}
                    </span>
                  </p>
                  <button className="border rounded-md bg-sky-300 text-white my-1 p-1">
                    <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                    {product.price - 50}
                    {" for tribe members"}
                  </button>
                  <Button
                    style={{
                      padding: "5px",
                      borderTop: "1px solid black",
                      width: "100%",
                    }}
                  >
                    VICOUS RYAN
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center w-full bg-midnight text-white p-4 rounded-lg shadow-md">
                <p className="text-lg">No Products Found</p>
                <p className="text-sm mt-2">
                  Please try again later or refine your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
