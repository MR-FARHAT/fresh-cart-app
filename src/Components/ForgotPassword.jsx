import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "../api";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, isValid } = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (formValues) => {
      setErrorMsg("");
      setIsLoading(true);
      try {
        const { data } = await api.post("/auth/forgotPasswords", formValues);
        if (data.statusMsg === "success") {
          navigate("/verifyCode");
        }
      } catch (error) {
        setErrorMsg(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <div className="cardDetails text-center">
        <h2 className="fw-bolder">Forgot your password?</h2>
        <form onSubmit={handleSubmit}>
          <p>Enter your email and we'll send you a code to reset your password.</p>
          <input onChange={handleChange} onBlur={handleBlur} value={values.email} id="email" name="email" type="email" placeholder="Email address" className="form-control" />
          {errors.email && touched.email && <p className="alert alert-danger mt-2">{errors.email}</p>}
          {errorMsg && <div className="alert alert-danger mt-2">{errorMsg}</div>}
          <button disabled={!isValid || isLoading} type="submit" className="btn btn-primary mt-3 px-4">
            {isLoading ? <i className="fa-solid fa-sync fa-spin"></i> : "Send Code"}
          </button>
        </form>
      </div>
    </div>
  );
}
