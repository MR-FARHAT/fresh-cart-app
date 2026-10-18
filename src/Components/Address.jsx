import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { api, getErrorMessage } from "../api";

const validationSchema = Yup.object({
  details: Yup.string().required("Address details are required"),
  phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Please enter a valid phone number"),
  city: Yup.string().required("City is required"),
});

const fields = [
  { name: "details", label: "Details", type: "text" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "city", label: "City", type: "text" },
];

export default function Address() {
  const { cartId } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid } = useFormik({
    initialValues: { details: "", phone: "", city: "" },
    validationSchema,
    onSubmit: async (shippingAddress) => {
      setErrorMsg("");
      setIsLoading(true);
      try {
        const { data } = await api.post(
          `/orders/checkout-session/${cartId}`,
          { shippingAddress },
          { params: { url: `${window.location.origin}${process.env.PUBLIC_URL}` } }
        );
        window.location.href = data.session.url;
      } catch (error) {
        setErrorMsg(getErrorMessage(error));
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="w-75 m-auto my-5">
      {fields.map(({ name, label, type }) => (
        <div key={name}>
          <label htmlFor={name} className="my-1">{label}</label>
          <input value={values[name]} onBlur={handleBlur} onChange={handleChange} type={type} className="form-control mb-3" id={name} name={name} />
          {errors[name] && touched[name] && <p className="alert alert-danger">{errors[name]}</p>}
        </div>
      ))}

      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <div className="d-grid">
        <button disabled={!isValid || isLoading} type="submit" className="btn btn-primary">
          {isLoading ? <i className="fa-solid fa-sync fa-spin"></i> : "Pay Online"}
        </button>
      </div>
    </form>
  );
}
