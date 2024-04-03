import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const getUserFromLocalStorage = () => {
  const userDetails = localStorage.getItem("userDetails");
  if (userDetails) {
    const personData = JSON.parse(userDetails);
    return parseData;
  } else {
    return {};
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [getGender, setGender] = useState("");
  const [getSearchProdct, setSearchProduct] = useState("");

  const API_BASE_URL = `https://academics.newtonschool.co`;

  const afterSliderSmallCarousal = [
    "https://images.bewakoof.com/uploads/grid/app/category-icon-Desktop-common--1--1706616684.gif",
    "https://images.bewakoof.com/uploads/grid/app/category-icon-Desktop-New-Arrivals-1706616683.jpg",
    "https://images.bewakoof.com/uploads/grid/app/category-icon-for-Desktop---1--1697613231.jpg",
    "https://images.bewakoof.com/uploads/grid/app/category-icon-Desktop--1706616685.jpg",
    "https://images.bewakoof.com/uploads/grid/app/thumbnails-Revamp-Customization--1--1693212866.jpg",
    "https://images.bewakoof.com/uploads/grid/app/thumbnails-Revamp-Combos-1693212865.gif",
    "https://images.bewakoof.com/uploads/grid/app/thumbnails-Revamp-Vote-1693212866.jpg",
    "https://images.bewakoof.com/uploads/grid/app/last-size-new-thumbnaik-1668508337.jpg",
  ];

  const getCategoryImageObject = {
    hoodie:
      "https://images.bewakoof.com/t1080/men-s-blue-brain-wash-graphic-printed-oversized-hoodies-624567-1703686117-1.jpg",
    jeans:
      "https://images.bewakoof.com/t1080/men-s-blue-baggy-straight-fit-distressed-cargo-jeans-624259-1707221481-1.jpg",
    jogger:
      "https://images.bewakoof.com/t1080/men-s-green-oversized-cargo-joggers-552881-1710769630-1.jpg",
    jumpsuit:
      "https://images.bewakoof.com/original/women-s-orange-jumpsuit-495715-1656163087-3.jpg",
    shirt:
      "https://images.bewakoof.com/t1080/men-s-blue-brain-wash-graphic-printed-oversized-hoodies-624567-1703686117-1.jpg",

    kurta:
      "https://images.bewakoof.com/t1080/men-s-blue-brain-wash-graphic-printed-oversized-hoodies-624567-1703686117-1.jpg",
    kurti:
      "https://images.bewakoof.com/t1080/men-s-blue-brain-wash-graphic-printed-oversized-hoodies-624567-1703686117-1.jpg",
    pyjamas:
      "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017622604_437Wx649H_202305211434211.jpeg",
    shorts:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/short/m/5/r/s-581532-bewakoof-original-imagtkahygetchsh.jpeg?q=20&crop=false",

    trouser:
      "https://images.bewakoof.com/t640/men-s-white-oversized-parachute-pants-628719-1707200253-1.jpg",
    tracksuit:
      "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/26416968/2023/12/14/a3512d75-260e-458d-92a7-294e66f6e21d1702537939618BewakoofWomensBlueButterflyGraphicPrintedCo-ordinates1.jpg",
    tshirt:
      "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/4/c/4c6f336DBEWAK00023028_1.jpg?rnd=20200526195200&tr=w-512",
  };

  const getSliderImageObject = [
    "https://images.bewakoof.com/uploads/grid/app/HC--1x1-Trendy-Jeans--1--1711457861.gif",
    "https://images.bewakoof.com/uploads/grid/app/1x1-MARCH-GPOT-Common-ezgif-com-optimize--2--1711457859.gif",
    "https://images.bewakoof.com/uploads/grid/app/HC--1x1-Trendy-Jeans--1--1711457861.gif",
    "https://images.bewakoof.com/uploads/grid/app/Peanuts-YFED-1x1-Graphic-final-1711690450.jpg",
    "https://images.bewakoof.com/uploads/grid/app/1x4-summerpalooza-ik-ezgif-com-optimize-1711301716.gif",
    "https://images.bewakoof.com/uploads/grid/app/1x4-summerpalooza-ik-ezgif-com-optimize-1711301716.gif",
  ];

  let object = {
    user,
    setUser,
    getCategoryImageObject,
    getSliderImageObject,
    afterSliderSmallCarousal,
    API_BASE_URL,
    getSearchProdct,
    setSearchProduct,
    getGender,
    setGender,
  };
  return (
    <>
      <AuthContext.Provider value={object}>{children}</AuthContext.Provider>
    </>
  );
};

// custom hooks
export const useAuth = () => {
  return useContext(AuthContext);
};
