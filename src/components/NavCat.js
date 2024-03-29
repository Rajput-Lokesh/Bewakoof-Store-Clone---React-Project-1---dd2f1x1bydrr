import { useEffect, useState } from "react";
// notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const NavCat = () => {
  const [categories, setCategories] = useState([]);
  const [filterSubCat, setFilterSubCat] = useState("");
  let CategoriesUrl =
    "https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories";

  useEffect(() => {
    fetch(CategoriesUrl, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setCategories(res.data);
        console.log(res.data);
        console.log(categories);
      });
  }, []);
  return (
    <>
      <ToastContainer />
      <nav
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "10px",
          borderBottom: "2px solid black",
        }}
      >
        {categories &&
          categories.map((catName, index) => (
            <p
              onClick={() => {
                alert(catName);
                // console.log(filterSubCat);
              }}
              key={index}
            >
              {catName.toUpperCase()}
            </p>
          ))}
      </nav>
    </>
  );
};

export default NavCat;
