import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "../api";
import { authContext, isDemoLogin } from "../Contexts/AuthContext";
import DemoAccount from "./DemoAccount";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Please enter a valid email address"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const { setUserIsLoggedIn, startDemo } = useContext(authContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { handleChange, handleBlur, handleSubmit, values, errors, touched, isValid } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (formValues) => {
      setErrorMsg("");

      if (isDemoLogin(formValues)) {
        startDemo();
        navigate(location.state?.from || "/home", { replace: true });
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await api.post("/auth/signin", formValues);
        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          setUserIsLoggedIn(true);
          navigate(location.state?.from || "/home", { replace: true });
        }
      } catch (error) {
        setErrorMsg(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="col-11 col-sm-8 col-md-6 col-lg-4 m-auto shadow-lg p-4 my-5">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label mt-2">Email</label>
        <input type="email" className="form-control" onBlur={handleBlur} onChange={handleChange} value={values.email} id="email" name="email" />
        {errors.email && touched.email && <p className="alert alert-warning my-2">{errors.email}</p>}

        <label htmlFor="password" className="form-label mt-2">Password</label>
        <input type="password" className="form-control" onBlur={handleBlur} onChange={handleChange} value={values.password} id="password" name="password" />
        {errors.password && touched.password && <p className="alert alert-warning my-2">{errors.password}</p>}

        <DemoAccount />

        <Link to="/passwordReset" className="d-inline-block text-main mt-2">Forgot password?</Link>

        <button type="submit" disabled={!isValid || isLoading} className="btn btn-outline-success ms-auto my-2 d-block px-4">
          {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
        </button>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <p className="text-center mb-0">
          Don't have an account? <Link to="/register" className="text-main">Register</Link>
        </p>
      </form>
    </div>
  );
}
