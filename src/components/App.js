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
import { SubCategory } from "../Pages/SubCategory";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Login } from "../Pages/Login";
import { Footer } from "../components/Footer";
import { ProductDetails } from "../Pages/ProductDetails";

// API_BASE_URL = "https://academics.newtonschool.co"

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* <ProductList /> */}
          {/* <Login /> */}
          <NavBar />
          <NavSubCat />

          <Outlet />

          <Routes>
            <Route path="/products" element={<SingleProductCard />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/login" element={<Login />} />
            <Route path="/productlist" element={<ProductList />} />

            <Route
              path="/productlist/productdetails/:id"
              element={<ProductDetails />}
            />
            {/* <Route path="/subCategory/:type" element={<SubCategory />} /> */}
            <Route
              path="/subCategory/productdetails/:id"
              element={<ProductDetails />}
            />

            {/* <Route
            path="/products/:ProductsDetails"
            element={<ProductsDetails />}
          /> */}
          </Routes>
          {/* <Footer /> */}
          {/* <Link to="/products">Single Product</Link> */}
          <br />
          {/* <Link to="/homepage"> Home </Link> */}
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
