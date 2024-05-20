import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigateToLogin = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(5, "Name must be more than 3 charcters")
      .max(20, "Name must be less than 20 charcters"),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter valid Email"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string().required("Phone number is required"),
  });

  

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    isValid,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: async () => {
      setErrorMsg("");

      try {
        setIsLoading(true);
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (data.message == "success") {
          navigateToLogin("/login");
        }
        console.log(data);
      } catch (error) {
        setErrorMsg(  );
      }
      setIsLoading(false);
    },
    validationSchema,
  });
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            id="name"
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <p className="alert alert-danger">{errors.name}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            id="email"
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="alert alert-danger">{errors.email}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            id="password"
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <p className="alert alert-danger">{errors.password}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="rePassword">Repassword</label>
          <input
            type="password"
            className="form-control"
            placeholder="Repassword"
            value={values.rePassword}
            onChange={handleChange}
            id="rePassword"
            onBlur={handleBlur}
          />
          {errors.rePassword && touched.rePassword && (
            <p className="alert alert-danger">{errors.rePassword}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            className="form-control"
            placeholder="Phone"
            value={values.phone}
            onChange={handleChange}
            id="phone"
            onBlur={handleBlur}
          />
          {errors.phone && touched.phone && (
            <p className="alert alert-danger">{errors.phone}</p>
          )}
        </div>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

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
              Sign Up
            </button>
          )}
        </div>
        <p className="forgot-password text-right mt-3 ">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    </div>
  );
}
