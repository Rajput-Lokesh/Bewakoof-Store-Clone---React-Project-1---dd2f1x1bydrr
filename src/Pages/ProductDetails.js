import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useAuth } from "../contexts/AuthContext";

export function ProductDetails({ e }) {
  return (
    <>
      <h1>I m Product</h1>
      <h1>{e.name}</h1>
    </>
  );
}
