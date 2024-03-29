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

  return (
    <>
      <AuthProvider.Provider value={{ user, setUser }}>
        {children}
      </AuthProvider.Provider>
    </>
  );
};

// custom hooks
export const useAuth = () => {
  return useContext(AuthContext);
};
