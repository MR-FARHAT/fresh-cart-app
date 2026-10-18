import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "../api";

const validationSchema = Yup.object({
  resetCode: Yup.string().required("Code is required").matches(/^\d+$/, "The code contains numbers only"),
});

export default function VerifyCode() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, isValid } = useFormik({
    initialValues: { resetCode: "" },
    validationSchema,
    onSubmit: async (formValues) => {
      setErrorMsg("");
      setIsLoading(true);
      try {
        const { data } = await api.post("/auth/verifyResetCode", formValues);
        if (data.status === "Success") {
          navigate("/resetPassword");
        }
      } catch (error) {
        setErrorMsg(getErrorMessage(error, "The code is invalid or has expired."));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <div className="cardDetails text-center">
        <h2 className="fw-bolder">Enter the code</h2>
        <form onSubmit={handleSubmit}>
          <p>We've sent a verification code to your email address.</p>
          <input onChange={handleChange} onBlur={handleBlur} value={values.resetCode} id="resetCode" name="resetCode" type="text" inputMode="numeric" placeholder="Reset code" className="form-control" />
          {errors.resetCode && touched.resetCode && <p className="alert alert-danger mt-2">{errors.resetCode}</p>}
          {errorMsg && <div className="alert alert-danger mt-2">{errorMsg}</div>}
          <button disabled={!isValid || isLoading} type="submit" className="btn btn-primary mt-3 px-4">
            {isLoading ? <i className="fa-solid fa-sync fa-spin"></i> : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
