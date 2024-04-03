import React, { useState } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../Providers/AuthProvider";

export const Login = () => {
  const [isOpenSign, setIsOpenSign] = useState(true);

  const [logInAcDetails, setLogInAcDetails] = useState({
    userEmail: "",
    password: "",
  });

  const [signInAcDetails, setSignInAcDetails] = useState({
    name: "",
    userEmail: "",
    password: "",
    phone: "",
  });

  const handleInputChangeSignin = (e) => {
    const { name, value } = e.target;
    setSignInAcDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitCreateDetails = (e) => {
    e.preventDefault();
    console.log(signInAcDetails);
  };

  const handleInputChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogInAcDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitLoginDetails = (e) => {
    e.preventDefault();
    console.log(logInAcDetails);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center md:w-full mt-[100px] ">
        <div className=" w-1/2">
          <h1 className="text-3xl font-bold my-1">
            Welcome to the world of Bewakoof®!
          </h1>
          <img
            className="h-screen w-full"
            src="https://images.bewakoof.com/web/group-19-1617704502.png"
            alt="Bewakoof"
          />
        </div>

        {isOpenSign ? (
          <div className=" w-1/3">
            <form className="leading-8 flex flex-col justify-center my-[200px]">
              <h1 className="text-3xl font-bold text-center my-4">
                Login / Sign up
              </h1>
              <h2 className=" text-2xl text-center opacity-[50%] font-bold">
                For Latest trends, exciting offers and everything Bewakoof®!
              </h2>

              <div className="leading-8">
                <label className="text-xl">Email </label>
                <input
                  name="userEmail"
                  onChange={handleInputChangeLogin}
                  value={logInAcDetails.userEmail}
                  required
                  className="border w-full p-2 rounded-md"
                  placeholder="Enter your email address"
                  type="email"
                />
              </div>
              <div className="leading-8">
                <label className="text-xl">Password </label>
                <input
                  name="password"
                  onChange={handleInputChangeLogin}
                  value={logInAcDetails.password}
                  required
                  className="border w-full p-2 rounded-md"
                  placeholder="Enter your password "
                  type="password"
                />
              </div>
              <div className="flex flex-col justify-center items-center ">
                <label className="text-xl text-left my-1">
                  Forgot Password
                </label>
                <Button
                  onClick={submitLoginDetails}
                  className="w-full p-2"
                  variant="contained"
                >
                  Sign In
                </Button>
                <div>or</div>
                <Button
                  onClick={() => {
                    setIsOpenSign(false);
                  }}
                  className="w-full p-3 "
                  variant="contained"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className=" w-1/3">
              <form className="leading-8 flex flex-col justify-center my-[200px]">
                <h1 className="text-3xl font-bold text-center my-4">
                  Create An Account
                </h1>
                <h2 className=" text-2xl text-center opacity-[50%] font-bold">
                  For Latest trends, exciting offers and everything Bewakoof®!
                </h2>
                <div className="leading-8">
                  <label className="text-xl">Name </label>
                  <input
                    required
                    name="name"
                    onChange={handleInputChangeSignin}
                    value={signInAcDetails.name}
                    className="border w-full p-2 rounded-md"
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>

                <div className="leading-8">
                  <label className="text-xl">Email </label>
                  <input
                    required
                    name="userEmail"
                    onChange={handleInputChangeSignin}
                    value={signInAcDetails.userEmail}
                    className="border w-full p-2 rounded-md"
                    placeholder="Enter your email address"
                    type="email"
                  />
                </div>

                <div className="leading-8">
                  <label className="text-xl">Phone </label>
                  <input
                    required
                    minLength={10}
                    maxLength={10}
                    name="phone"
                    onChange={handleInputChangeSignin}
                    value={signInAcDetails.phone}
                    className="border w-full p-2 rounded-md"
                    placeholder="Enter your number"
                    type="text"
                  />
                </div>

                <div className="leading-8">
                  <label className="text-xl">Password </label>
                  <input
                    required
                    name="password"
                    onChange={handleInputChangeSignin}
                    value={signInAcDetails.password}
                    className="border w-full p-2 rounded-md"
                    placeholder="Enter your password "
                    type="password"
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-5 ">
                  <Button
                    type="submit"
                    className="w-full p-3"
                    variant="contained"
                    onClick={submitCreateDetails}
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};
