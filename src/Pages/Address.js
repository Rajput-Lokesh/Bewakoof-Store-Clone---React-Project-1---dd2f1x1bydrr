import React from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Address = () => {
  const navigate = useNavigate();
  const addressValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Invalid phone number")

      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number cannot exceed 15 characters")
      .required("Phone number is required"),
    zipCode: Yup.string().required("Zip code is required"),
    country: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    landmark: Yup.string(),
    area: Yup.string(),
    addressType: Yup.string().required("Address type is required"),
  });

  const initialValues = {
    name: "",
    phone: "",
    zipCode: "",
    country: "",
    state: "",
    city: "",
    landmark: "",
    area: "",
    addressType: "",
  };

  const submitAddress = (values, actions) => {
    localStorage.setItem("userAddressDetails", JSON.stringify(values));
    console.log(values);

    actions.resetForm();
    navigate("/paymentprocess");
  };

  return (
    <div className="absolute w-full top-[100px] border p-[30px] bg-silver flex flex-col justify-center items-center ">
      <Formik
        initialValues={initialValues}
        validationSchema={addressValidationSchema}
        onSubmit={submitAddress}
      >
        <Form className="bg-white p-5 flex flex-col gap-2">
          <div className="">
            <label htmlFor="name">Full Name *</label>
            <Field
              className="border w-full p-1 rounded-md"
              id="name"
              name="name"
              placeholder="Enter Name..."
            />
            <ErrorMessage
              className="text-red text-center"
              name="name"
              component="div"
            />
          </div>

          <div className="">
            <label htmlFor="phone"> Mobile Number </label>
            <Field
              className="border w-full p-1 rounded-md"
              id="phone"
              name="phone"
              placeholder="Enter Mobile Number..."
            />
            <ErrorMessage
              className="text-red text-center"
              name="phone"
              component="div"
            />
          </div>

          <div className="">
            <label htmlFor="zipCode">Zip Code *</label>
            <Field
              className="border w-full p-1 rounded-md"
              id="zipCode"
              name="zipCode"
              placeholder="Enter Zip Code..."
            />
            <ErrorMessage
              className="text-red text-center"
              name="zipCode"
              component="div"
            />
          </div>

          <div className="flex gap-1">
            <div className="">
              <label htmlFor="country">Country</label>
              <Field
                className="border w-full p-1 rounded-md"
                id="country"
                name="country"
                placeholder="Enter Country..."
              />
              <ErrorMessage
                className="text-red text-center"
                name="country"
                component="div"
              />
            </div>

            <div className="">
              <label htmlFor="state">State</label>
              <Field
                className="border w-full p-1 rounded-md"
                id="state"
                name="state"
                placeholder="Enter State"
              />
              <ErrorMessage
                className="text-red text-center"
                name="state"
                component="div"
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="city">city</label>
            <Field
              className="border w-full p-1 rounded-md"
              id="city"
              name="city"
              placeholder="Enter city"
            />
            <ErrorMessage
              className="text-red text-center"
              name="city"
              component="div"
            />
          </div>

          <div className="">
            <label htmlFor="landmark">Landmark</label>
            <Field
              className="border w-full p-1 rounded-md"
              id="landmark"
              name="landmark"
              placeholder="Landmark (Optional)"
            />
            <ErrorMessage
              className="text-red text-center"
              name="landmark"
              component="div"
            />
          </div>

          <div className="">
            <label htmlFor="area">Area / Locality</label>
            <Field
              className="border w-full p-1 rounded-md"
              id="area"
              name="area"
              placeholder="Area / Locality"
            />
            <ErrorMessage
              className="text-red text-center"
              name="area"
              component="div"
            />
          </div>

          <div id="my-radio-group">Save Address As</div>

          <div
            className="flex gap-3"
            role="group"
            aria-labelledby="my-radio-group"
          >
            <label className="flex justify-center items-center gap-1">
              <Field
                className="border w-full p-1 rounded-md"
                type="radio"
                name="addressType"
                value="Home"
              />
              Home
            </label>

            <label className="flex justify-center items-center gap-1">
              <Field
                className="border w-full p-1 rounded-md"
                type="radio"
                name="addressType"
                value="Office"
              />
              Office
            </label>

            <label className="flex justify-center items-center gap-1">
              <Field
                className="border w-full p-1 rounded-md"
                type="radio"
                name="addressType"
                value="Other"
              />
              Other
            </label>
          </div>

          <button
            className="bg-bewBtn text-white font-bold w-full p-3  rounded-lg text-xl "
            type="submit"
          >
            Add Address
          </button>
        </Form>
      </Formik>
    </div>
  );
};