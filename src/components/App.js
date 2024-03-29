import "../styles/App.css";
import NavBar from "../Pages/NavBar";
import NavCat from "./NavCat";
import { SingleProductCard } from "./SingleProductCard";
import { AuthProvider } from "../Providers/AuthProvider";
import { NotFound } from "./NotFound";

import { Link, BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ToastContainer } from "react-toastify";
// API_BASE_URL = "https://academics.newtonschool.co"

function App() {
  return (
    <>
      {/* <AuthProvider> */}{" "}
      <BrowserRouter>
        <NavBar />
        <NavCat />
        <Outlet />
        <Routes>
          <Route path="/products" element={<SingleProductCard />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route
            path="/products/:ProductsDetails"
            element={<ProductsDetails />}
          /> */}
        </Routes>
        <Link to="/products">Single Product</Link>
        <br />
        <Link to="/homepage"> Home </Link>
      </BrowserRouter>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
