import "../styles/App.css";
import NavBar from "../Pages/NavBar";
import NavSubCat from "../Pages/NavSubCat";
import { SingleProductCard } from "./SingleProductCard";
import { AuthProvider } from "../Providers/AuthProvider";
import { NotFound } from "../Pages/NotFound";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ProductList } from "../Pages/ProductList";
import { Login } from "../Pages/Login";
import { Footer } from "../components/Footer";
import { ProductDetails } from "../Pages/ProductDetails";
import { WishList } from "./WishList";
import { AddToCart } from "../Pages/AddToCart";
import { Address } from "../Pages/Address";
import { Register } from "../Pages/Register";
import { PaymentProcess } from "../Pages/PaymentProces";
import { ConfirmOrderPayment } from "../Pages/ConfirmOrderPayment";
import { OrderConfirmGreetingPage } from "../Pages/OrderConfirmGreetingPage";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <NavSubCat />
          <Outlet />

          <Routes>
            <Route path="/products" element={<SingleProductCard />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/WishList" element={<WishList />} />
            <Route path="/addtocart" element={<AddToCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/address" element={<Address />} />
            <Route path="/register" element={<Register />} />
            <Route path="/paymentprocess" element={<PaymentProcess />} />
            <Route
              path="/paymentprocess/confirmorderpayment"
              element={<ConfirmOrderPayment />}
            />
            <Route
              path="/paymentprocess/confirmorderpayment/orderconfirmgreetingPage"
              element={<OrderConfirmGreetingPage />}
            />
            <Route
              path="/productlist/productdetails/:id"
              element={<ProductDetails />}
            />
            <Route
              path="/wishlist/productdetails/:id"
              element={<ProductDetails />}
            />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
