import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { authContext } from '../Contexts/AuthContext'
const validationSchema = Yup.object({

  email: Yup.string().required("required field").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, "pleas writ the correct email address"),
  password: Yup.string().required("required field").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i, "Minimum eight characters, at least one letter, one number and one special character:"),
})
const initialValues = {
  email: '',
  password: '',
}
export default function Login() {

  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext)



  const [err, seterr] = useState('')
  const [isload, setload] = useState(false)
  const navigate = useNavigate('')
  const { handleChange, values, handleSubmit, errors, handleBlur, touched, isValid } = useFormik({
    initialValues,
    onSubmit: async () => {
      seterr('')
      setload(true)
      try {
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)

        // eslint-disable-next-line eqeqeq
        if (data.message == "success") {
          setUserIsLoggedIn(true)
          localStorage.setItem('token', data.token)

          if (window.location.pathname == '/login') {
            navigate('/home')
          } else {
            navigate(window.location.pathname)
          }




        }


      } catch (error) {
        seterr(error.response.data.message)
      }
      setload(false)
    },
    validationSchema
  })


  return (
    <>


      <div className="col-md-4 m-auto shadow-lg p-5">
        <form onSubmit={handleSubmit}>

          <label htmlFor="email" className="form-label mt-2">Email</label>
          <input type="email" className="form-control " onBlur={handleBlur} onChange={handleChange} value={values.email} id="email" name="email" />
          {errors.email && touched.email && <p className="alert alert-warning my-2">{errors.email}</p>}

          <label htmlFor="pass-1" className="form-label mt-2">Password</label>
          <input type="password" className="form-control " onBlur={handleBlur} onChange={handleChange} value={values.password} id="pass-1" name="password" />
          {errors.password && touched.password && <p className="alert alert-warning my-2">{errors.password}</p>}
          <Link to={'/passwordReset'}><p className='text-main'>FogetPassword</p></Link>
          {isload ? <button type="submit" disabled="" className="btn bg-main text-white ms-auto my-2 px-4 d-block"><i className="px-2 fa-solid fa-spinner fa-spin"></i></button>
            :
            <button type="submit" disabled={!isValid || isload} className="btn btn-outline-success ms-auto my-2 d-block">LOGIN</button>

          }

          {err && <div className="alert alert-danger">{err}</div>}





        </form>
      </div>


    </>
  )
}
