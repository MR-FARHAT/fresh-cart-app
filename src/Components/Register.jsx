import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { api, getErrorMessage } from "../api";

const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
  email: Yup.string().required("Email is required").email("Please enter a valid email address"),
  phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian phone number"),
  password: Yup.string()
    .required("Password is required")
    .matches(passwordRule, "At least 8 characters, including a letter, a number and a special character"),
  rePassword: Yup.string().required("Please confirm your password").oneOf([Yup.ref("password")], "Passwords don't match"),
});

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone number", type: "tel" },
  { name: "password", label: "Password", type: "password" },
  { name: "rePassword", label: "Confirm password", type: "password" },
];

export default function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { handleChange, handleBlur, handleSubmit, values, errors, touched, isValid } = useFormik({
    initialValues: { name: "", email: "", phone: "", password: "", rePassword: "" },
    validationSchema,
    onSubmit: async (formValues) => {
      setErrorMsg("");
      setIsLoading(true);
      try {
        const { data } = await api.post("/auth/signup", formValues);
        if (data.message === "success") {
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
    <div className="col-md-4 m-auto shadow-lg p-5 my-5">
      <form onSubmit={handleSubmit}>
        {fields.map(({ name, label, type }) => (
          <div key={name}>
            <label htmlFor={name} className="form-label mt-2">{label}</label>
            <input type={type} className="form-control" id={name} name={name} onBlur={handleBlur} onChange={handleChange} value={values[name]} />
            {errors[name] && touched[name] && <p className="alert alert-warning my-2">{errors[name]}</p>}
          </div>
        ))}

        <button type="submit" disabled={!isValid || isLoading} className="btn btn-outline-success ms-auto my-3 d-block px-4">
          {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Register"}
        </button>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <p className="text-center mb-0">
          Already have an account? <Link to="/login" className="text-main">Login</Link>
        </p>
      </form>
    </div>
  );
}
