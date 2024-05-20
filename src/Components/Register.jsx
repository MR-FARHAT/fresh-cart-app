import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const validationSchema = Yup.object({
  name: Yup.string().required("required field").min(3, "the minimum required field is three characters").max(20, "the maxmum required field is 20 characters"),

  email: Yup.string().required("required field").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, "pleas writ the correct email address"),
  phone: Yup.string().required("required field").matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i, "pleas writ the correct phone number"),
  password: Yup.string().required("required field").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i, "Minimum eight characters, at least one letter, one number and one special character:"),
  rePassword: Yup.string().required("required field").oneOf([Yup.ref("password")], "should be matches with password")


})
const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  rePassword: ''
}

// const validate = (values) => {
//     let errors = {}
//     if (!values.name) {
//         errors.name = "required field"
//     } else if (values.name === "") {
//         errors.name = "required field"
//     }
//     else if (values.name.length < 3) {
//         errors.name = "the minimum required field is three characters"
//     }
//     console.log(errors)
//     return errors

// }
export default function Register() {
  const [err, seterr] = useState('')
  const [isload, setload] = useState(false)
  const navigate = useNavigate('')
  const { handleChange, values, handleSubmit, errors, handleBlur, touched, isValid } = useFormik({
    initialValues,
    onSubmit: async () => {
      seterr('')
      setload(true)
      try {
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        console.log(data)
        // eslint-disable-next-line eqeqeq
        if (data.message == "success") {
          navigate('/login')
        }

      } catch (error) {
        seterr(error.response.data.message)
        // let err = error.response.data.message
        // eslint-disable-next-line no-unused-expressions
        // err ? window.alert(err) : ""
      }
      setload(false)
    },
    validationSchema


  })

  return (
    <>


      <div className="col-md-4 m-auto shadow-lg p-5">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="form-label mt-2">your name</label>
          <input onBlur={handleBlur} type="text" className="form-control " id="name" name="name" onChange={handleChange} value={values.name} />
          {errors.name && touched.name && <p className="alert alert-warning my-2">{errors.name}</p>}

          <label htmlFor="email" className="form-label mt-2">Email</label>
          <input onBlur={handleBlur} type="email" className="form-control " id="email" name="email" onChange={handleChange} value={values.email} />
          {errors.email && touched.email && <p className="alert alert-warning my-2">{errors.email}</p>}
          <label htmlFor="phone" className="form-label mt-2">Phone number</label>
          <input onBlur={handleBlur} type="text" className="form-control " id="phone" name="phone" onChange={handleChange} value={values.phone} />
          {errors.phone && touched.phone && <p className="alert alert-warning my-2">{errors.phone}</p>}
          <label htmlFor="pass-1" className="form-label mt-2">Password</label>
          <input onBlur={handleBlur} type="password" className="form-control " id="pass-1" name="password" onChange={handleChange} value={values.password} />
          {errors.password && touched.password && <p className="alert alert-warning my-2">{errors.password}</p>}
          <label htmlFor="pass-2" className="form-label mt-2">repassword</label>
          <input onBlur={handleBlur} type="password" className="form-control " id="pass-2" name="rePassword" onChange={handleChange} value={values.rePassword} />
          {errors.rePassword && touched.rePassword && <p className="alert alert-warning my-2">{errors.rePassword}</p>}
          {isload ? <button type="submit" disabled="" className="btn bg-main ms-auto my-2 px-4 d-block"><i className="px-2 fa-solid fa-spinner fa-spin"></i></button>
            :
            <button type="submit" disabled={!isValid || isload} className="btn btn-outline-success ms-auto my-2 d-block">SUBMIT</button>
          }


          {err && <div className="alert alert-danger">{err}</div>}
        </form>
      </div>


    </>
  )
}
