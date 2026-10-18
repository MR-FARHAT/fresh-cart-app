import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "../api";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Please enter a valid email address"),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "At least 8 characters, with an uppercase letter, a lowercase letter, a number and a special character"
    ),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { values, handleSubmit, handleChange, handleBlur, errors, touched, isValid } = useFormik({
    initialValues: { email: "", newPassword: "" },
    validationSchema,
    onSubmit: async (formValues) => {
      setErrorMsg("");
      setIsLoading(true);
      try {
        const { data } = await api.put("/auth/resetPassword", formValues);
        if (data.token) {
          navigate("/login");
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
        <h2 className="fw-bolder">Reset your password</h2>
        <form onSubmit={handleSubmit}>
          <p>You can now set a new password.</p>
          <input onChange={handleChange} onBlur={handleBlur} value={values.email} id="email" name="email" type="email" placeholder="Email" className="form-control mb-3" />
          {errors.email && touched.email && <p className="alert alert-danger mt-2">{errors.email}</p>}

          <input onChange={handleChange} onBlur={handleBlur} value={values.newPassword} id="newPassword" name="newPassword" type="password" placeholder="New password" className="form-control" />
          {errors.newPassword && touched.newPassword && <p className="alert alert-danger mt-2">{errors.newPassword}</p>}

          {errorMsg && <div className="alert alert-danger mt-2">{errorMsg}</div>}
          <button disabled={!isValid || isLoading} type="submit" className="btn btn-primary mt-3 px-4">
            {isLoading ? <i className="fa-solid fa-sync fa-spin"></i> : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
