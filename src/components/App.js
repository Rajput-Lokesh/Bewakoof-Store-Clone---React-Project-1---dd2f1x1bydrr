import "../styles/App.css";
import NavBar from "../Pages/NavBar";
import NavSubCat from "../Pages/NavSubCat";
import { SingleProductCard } from "./SingleProductCard";
import { useAuth, AuthProvider } from "../Providers/AuthProvider";
import { NotFound } from "../Pages/NotFound";

import { Link, BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ToastContainer } from "react-toastify";
import { ProductList } from "../Pages/ProductList";
import { Men } from "../Pages/Men";
import { Women } from "../Pages/Women";
import { MobileCovers } from "../Pages/MobileCovers";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import { Carousel } from "primereact/carousel";

// API_BASE_URL = "https://academics.newtonschool.co"

function App() {
  const getSliderImageObject = [
    "https://images.bewakoof.com/uploads/grid/app/1x4-summerpalooza-ik-ezgif-com-optimize-1711301716.gif",
    "https://images.bewakoof.com/uploads/grid/app/Peanuts-YFED-1x1-Graphic-final-1711690450.jpg",
    "https://images.bewakoof.com/uploads/grid/app/1x1-MARCH-GPOT-Common-ezgif-com-optimize--2--1711457859.gif",

    "https://images.bewakoof.com/uploads/grid/app/HC--1x1-Trendy-Jeans--1--1711457861.gif",

    "https://images.bewakoof.com/uploads/grid/app/1x4-summerpalooza-ik-ezgif-com-optimize-1711301716.gif",

    "https://images.bewakoof.com/uploads/grid/app/HC--1x1-Trendy-Jeans--1--1711457861.gif",
  ];
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const productTemplate = (pro) => {
    return (
      <>
        <img src={pro} />
      </>
    );
  };
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <ProductList /> */}
          <NavBar />
          <NavSubCat />
          <Carousel
            value={getSliderImageObject}
            numVisible={3}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={productTemplate}
          />
          <Outlet />
          <Routes>
            <Route path="/products" element={<SingleProductCard />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/mobilecovers" element={<MobileCovers />} />
            {/* <Route
            path="/products/:ProductsDetails"
            element={<ProductsDetails />}
          /> */}
          </Routes>
          {/* <Link to="/products">Single Product</Link> */}
          <br />
          {/* <Link to="/homepage"> Home </Link> */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
