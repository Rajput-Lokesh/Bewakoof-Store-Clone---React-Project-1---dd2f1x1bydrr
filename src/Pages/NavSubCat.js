import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";

const NavCat = () => {
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("shirt");
  const CategoriesUrl =
    "https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories";

  const [getProduct, setProduct] = useState([]);
  useEffect(() => {
    const productUrl = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?filter={"gender":"Women","subCategory":"${subCategory}"}`;

    fetch(productUrl, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("I m from Single Product");
        console.log(res);
        setProduct(res.data);
        console.log(res.data);
      });
  }, [subCategory]);

  useEffect(() => {
    fetch(CategoriesUrl, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      });
  }, []);

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          borderBottom: "2px solid black",
          gap: "10px",
          padding: "15px",
        }}
      >
        {categories.map((catName, index) => (
          <p
            key={index}
            onClick={() => {
              setSubCategory(catName);
            }}
          >
            {catName.toUpperCase()}
          </p>
        ))}
      </nav>
      {/* <h1 className="text-center text-4xl my-3">{`<- ${subCategory} Product Page ->`}</h1>
      <div className="flex flex-wrap justify-around bg-slate-700 p-4">
        {getProduct.map((product, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              maxWidth: "24%",
              margin: "5px",
            }}
          >
            <img
              onClick={() => {
                alert(product._id);
              }}
              width="450px"
              src={product.displayImage}
              alt={product.name}
            />
            <p style={{ position: "absolute", top: "0px", background: "gray" }}>
              PLUS_SIZE
            </p>
            <div
              style={{ position: "absolute", bottom: "0px" }}
              className="flex"
            >
              <StarIcon color="success" />
              <div className="text-slate-400">{product.ratings.toFixed(2)}</div>
            </div>
            <p>Bewakoof®</p>
            <p>{product.name}</p>
            <p>{product.subCategory}</p>
            <p>
              <CurrencyRupeeIcon style={{ fontSize: "20px" }} /> {product.price}
            </p>
            <Button
              style={{
                padding: "5px",
                borderTop: "1px solid black",
                borderLeft: "1px solid black",
                borderRight: "1px solid black",
              }}
            >
              VICOUS RYAN
            </Button>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default NavCat;
