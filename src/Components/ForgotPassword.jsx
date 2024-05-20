import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function ForgotPassword() {

  const [result, setResult] = useState({});
  const navigateToCode = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter valid Email"
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
    },
    onSubmit: async () => {
      setErrorMsg("");
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
          values
        );
        if (data.statusMsg == 'success') {
          navigateToCode ('/verifyCode')
        }
        setResult(data);
        console.log(data);
      } catch (error) {
        setErrorMsg("Error Message");
      }
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <div className="row h-100">
      <div className="ForgorPasswordCard d-flex flex-column justify-content-center align-items-center">
        <div className="cardDetails text-center ">
          <h2 className="fw-bolder">Forgot your password? </h2>
          <form onSubmit={handleSubmit} action="" className="text-center">
            <p>
              Enter your email address and we'll send you a link to reset you
              password
            </p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              id="email"
              type="email"
              placeholder="Email Address"
              className="form-control"
            />
            {errors.email && touched.email && (
              <p className="alert alert-danger mt-2">{errors.email}</p>
            )}
            {result.message && <p className="mt-2 alert alert-success "> {result.message} </p>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
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
                  className="btn btn-primary signup-btn w-25 mt-3 m-auto "
                >
                  Send Link
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
