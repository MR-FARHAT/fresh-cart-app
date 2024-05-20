import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ResetPassword() {
  const [result, setResult] = useState({});
  const navigateToLogin = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [setErrorMsg] = useState("");
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter valid Email"
      ),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
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
      email: "",
      newPassword: "",
    },
    onSubmit: async () => {
      try {
        const { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          values
        );
        console.log(data);
        if (data.token != "") {
          navigateToLogin("/login");
        }
        setResult(data);
      } catch (error) {
        // setErrorMsg("Error Message");
      }
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <div className="row h-100">
      <div className="resetPassword d-flex flex-column justify-content-center align-items-center">
        <div className="cardDetails text-center ">
          <h2 className="fw-bolder mt-5">Reset Your Password </h2>
          <form onSubmit={handleSubmit} action="" className="text-center">
            <p className=" bg-info ">You Can Now Set a New Password</p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              id="email"
              type="text"
              placeholder="Email"
              className="form-control mb-3"
            />

            {errors.email && touched.email && (
              <p className="alert alert-danger mt-2">{errors.email}</p>
            )}

            <input
              onChange={handleChange}
              onBlur={handleBlur}
              id="newPassword"
              type="text"
              placeholder="New Password"
              className="form-control"
              value={values.newPassword}
            />

            {errors.newPassword && touched.newPassword && (
              <p className="alert alert-danger mt-2">{errors.newPassword}</p>
            )}

            <div className="d-grid">
              {isLoading ? (
                <button
                  disabled
                  type="button"
                  className="btn px-4 text-primary signup-btn w-100 "
                >
                  <i class="fa-solid fa-sync fa-spin"></i>
                </button>
              ) : (
                <button
                  disabled={!isValid || isLoading}
                  type="submit"
                  className="btn btn-primary signup-btn w-50 h2 mt-3 m-auto "
                >
                  Change Password
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
