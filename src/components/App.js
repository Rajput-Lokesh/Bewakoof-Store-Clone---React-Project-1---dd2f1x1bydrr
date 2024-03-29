import "../styles/App.css";
import NavBar from "./NavBar";
import NavCat from "./NavCat";
import { SingleProductCard } from "./SingleProductCard";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// API_BASE_URL = "https://academics.newtonschool.co"

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <NavCat />
      <SingleProductCard />
    </>
  );
}

export default App;
