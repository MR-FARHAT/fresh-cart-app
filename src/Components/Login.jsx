import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";

export default function Login() {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext);
  // console.log(userIsLoggedIn)
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigateToLogin = useNavigate();

  const validationSchema = Yup.object({
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
  });

  // function validate(values) {
  //   const errors = {};

  //   if (values.name === "") {
  //     errors.name = "Name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name must be more than 3 charcters";
  //   } else if (values.name.length > 20) {
  //     errors.name = "Name must be less than 20 charcters";
  //   }

  //   if (values.email === "") {
  //     errors.email = "Email is required";
  //   } else if (
  //     !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //       values.email
  //     )
  //   ) {
  //     errors.email = "Enter valid Email";
  //   }

  //   if (values.password === "") {
  //     errors.password = "Password is required";
  //   } else if (
  //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
  //       values.password
  //     )
  //   ) {
  //     errors.password =
  //       "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
  //   }

  //   if (values.rePassword === "") {
  //     errors.rePassword = "Repassword is requird";
  //   } else if (values.rePassword !== values.password) {
  //     errors.rePassword = "Password and repassword doesn't match";
  //   }

  //   if (values.phone === "") {
  //     errors.phone = "Phone number is requird";
  //   }

  //   console.log(errors);
  //   return errors;
  // }

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
      email: "",
      password: "",
    },
    onSubmit: async () => {
      setErrorMsg("");

      try {
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          values
        );
        if (data.message == "success") {
          setUserIsLoggedIn(true);
          localStorage.setItem("token", data.token);
          if (window.location.pathname == "/login") {
            navigateToLogin("/home");
          } else {
            navigateToLogin(window.location.pathname);
          }
        }
        console.log(data);
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
      setIsLoading(false);
    },
    validationSchema,
  });
  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <h3>Login</h3>

      <div className="mb-3">
        <label htmlFor="email">Email</label>
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
            className="btn btn-primary signup-btn mb-3 "
          >
            Login
          </button>
        )}
      </div>
      <Link to={"/passwordReset"} className="text-danger fw-bold ">
        Forgot Password
      </Link>
      <p className="forgot-password text-right mt-2 ">
        
        <Link to={"/register"} className="btn btn-primary text-white ">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
