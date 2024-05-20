import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function VerifyCode () {

  const [result, setResult] = useState({});
  const navigateToCode = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const validationSchema = Yup.object({
    resetCode: Yup.number()
      .required("Code is required")

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
      resetCode: "",
    },
    onSubmit: async () => {
      setErrorMsg("");
      try {
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        console.log (data)
        if (data.status == 'Success') {
          navigateToCode ('/resetPassword')
        }
        
        setResult(data);
      } catch (error) {
        setErrorMsg("Error Message");
      }
      setIsLoading(false);
    },
    validationSchema,
  });

  return (
    <div className="row h-100">
      <div className="resetCode d-flex flex-column justify-content-center align-items-center">
        <div className="cardDetails text-center ">
          <h2 className="fw-bolder">Enter the code </h2>
          <form onSubmit={handleSubmit} action="" className="text-center">
            <p>
            We've been sent a verify code to your email address
            </p>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.resetCode}
              id="resetCode"
              type="text"
              placeholder="Reset Code"
              className="form-control"
            />
            {errors.resetCode && touched.resetCode && (
              <p className="alert alert-danger mt-2">{errors.resetCode}</p>
            )}
            
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
                  Verify
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
