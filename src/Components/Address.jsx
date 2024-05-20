import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

export default function Address() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { cartId } = useParams();

  const validationSchema = Yup.object({
    details: Yup.string().required("details is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Enter valid phone number"),
    city: Yup.string().required("city is required"),
  });
  async function onSubmit() {
    setIsLoading(true);
    setErrorMsg("");
    try {
      let { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/' + cartId,
        {
          shippingAddress: values,
        },
        {
          params: {
            url: "http://localhost:3000",
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      window.open (data.session.url, "_self")
      
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
    setIsLoading(false);
  }
  const {
    handleSubmit,
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit} className="w-75 m-auto">
      <label htmlFor="details" className="my-1">
        Details:
      </label>
      <input
        value={values.details}
        onBlur={handleBlur}
        onChange={handleChange}
        type="text"
        className="form-control mb-3"
        id="details"
        name="details"
      />
      {errors.details && touched.details && (
        <p className="alert alert-danger ">{errors.details}</p>
      )}

      <label htmlFor="phone" className="my-1">
        Phone:
      </label>
      <input
        value={values.phone}
        onBlur={handleBlur}
        onChange={handleChange}
        type="tel"
        className="form-control mb-3"
        id="phone"
        name="phone"
      />
      {errors.phone && touched.phone && (
        <p className="alert alert-danger ">{errors.phone}</p>
      )}

      <label htmlFor="city" className="my-1">
        City:
      </label>
      <input
        value={values.city}
        onBlur={handleBlur}
        onChange={handleChange}
        type="text"
        className="form-control mb-3"
        id="city"
        name="city"
      />
      {errors.city && touched.city && (
        <p className="alert alert-danger ">{errors.city}</p>
      )}
      {errorMsg && <div className="alert alert-danger "> {errorMsg} </div>}

      <div className="d-grid">
        {isLoading ? (
          <button
            disabled
            type="button"
            className="btn px-4 text-primary signup-btn"
          >
            <i class="fa-solid fa-sync fa-spin"></i>
          </button>
        ) : (
          <button
            disabled={!isValid || isLoading}
            type="submit"
            className="btn btn-primary signup-btn"
          >
            Order
          </button>
        )}
      </div>
    </form>
  );
}
