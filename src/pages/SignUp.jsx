import { Link } from "react-router-dom"
import { useNavigate} from "react-router-dom"
// import http from "../helpers/http"
import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import propTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { clearMessage } from "../redux/reducers/auth"

import { asyncRegisterAction } from "../redux/actions/auth"

//IMAGES
import peopleBg from "../assets/images/picture.png"
import weTick from "../assets/images/wetick-logo.png"

const validationSchema = Yup.object({
  fullName: Yup.string().required().min(3, "Name is invalid"),
  email: Yup.string().required().email("Email is invalid"),
  password: Yup.string().required("Password is invalid"),
  confirmPassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Passwords must match"),
  checkbox: Yup.boolean().required().oneOf([true],"Checkbox expected")

})

const FormSignUp = ({values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting}) => {
  const errorMessage = useSelector(state => state.auth.errorMessage)
  const warningMessage = useSelector(state => state.auth.warningMessage)
  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-5">
      <div className="w-[80%] flex flex-col gap-5">
        <div className="text-3xl font-bold">Sign Up</div>
        <div className="flex gap-2">
          <span className="">Already have an account?</span>
          <Link className="font-semibold hover:text-secondary" to="/sign-in">Login</Link>
        </div>
        {warningMessage && 
        (<div>
          <div className="alert alert-warning">{warningMessage}</div>
        </div> )}
        {errorMessage && 
        (<div>
          <div className="alert alert-error">{errorMessage}</div>
        </div> )}
      </div>
      <div className="form-control">
        <input 
          className={`input input-bordered border-1 w-full ${errors.fullName && touched.fullName && "input-error"}`} 
          type="text" 
          name="fullName" 
          placeholder="Full Name" 
          onChange={handleChange} 
          onBlur={handleBlur}
          value={values.fullName} 
        />
        {errors.fullName && touched.fullName && (
          <label className="label">
            <span className="label-text-alt text-error"></span>
            <span className="label-text-alt text-error">{errors.fullName}</span>
          </label>
        )}

      </div>
      <div className="form-control">
        <input 
          className={`input input-bordered border-1 w-full ${errors.email && touched.email && "input-error"}`} 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          onBlur={handleBlur}
          value={values.email} 
        />
        {errors.email && touched.email && (
          <label className="label">
            <span className="label-text-alt text-error"></span>
            <span className="label-text-alt text-error">{errors.email}</span>
          </label>
        )}

      </div>
      <div className="form-control">
        <input 
          className={`input input-bordered border-1 w-full ${errors.password && touched.password && "input-error"}`} 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          onBlur={handleBlur}
          value={values.password} 
        />
        {errors.password && touched.password && (
          <label className="label">
            <span className="label-text-alt text-error"></span>
            <span className="label-text-alt text-error">{errors.password}</span>
          </label>
        )}

      </div>
      <div className="form-control">
        <input 
          className={`input input-bordered border-1 w-full ${errors.confirmPassword && touched.confirmPassword && "input-error"}`} 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          onChange={handleChange} 
          onBlur={handleBlur}
          value={values.confirmPassword} 
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <label className="label">
            <span className="label-text-alt text-error"></span>
            <span className="label-text-alt text-error">{errors.confirmPassword}</span>
          </label>
        )}

      </div>
      
      <div className="form-control">
        <label id="input-checkbox" className="signup-label">
          <input 
            id="checkbox" 
            type="checkbox" 
            name="checkbox"
            onChange={handleChange} 
            onBlur={handleBlur}
            value={values.checkbox}
          />
                Accept terms and condition
          {errors.checkbox && touched.checkbox && (
            <label className="label">
              <span className="label-text-alt text-error"></span>
              <span className="label-text-alt text-error">{errors.checkbox}</span>
            </label>
          )}
        </label>

      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-full text-center">
          <button disabled={isSubmitting} type="submit" className="btn btn-accent hover:btn-secondary btn-block normal-case">Sign Up</button>
        </div>
      </div>
    </form>
  )
}

FormSignUp.propTypes = {
  values: propTypes.objectOf(propTypes.string),
  errors: propTypes.objectOf(propTypes.string),
  touched: propTypes.objectOf(propTypes.bool),
  handleBlur: propTypes.func,
  handleChange: propTypes.func,
  handleSubmit: propTypes.func,
  isSubmitting: propTypes.bool

}

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const token = useSelector(state => state.auth.token)
  const successMessage = useSelector(state => state.auth.successMessage)
  // const formError = useSelector(state => state.auth.token)
  
  

  React.useEffect(()=> {
    if(successMessage){
      console.log("test")
      navigate("/sign-in")
    }
  }, [successMessage, navigate])

  const doLogin = async (values, {setSubmitting, /*setErrors*/}) => {
    dispatch(clearMessage())
    dispatch(asyncRegisterAction(values))
    // if(formError.length){
    //   setErrors({
    //     email: formError.filter(item => item.param === "email")[0].message,
    //     password: formError.filter(item =>item.param === "password")[0].message
    //   })
    // }
    setSubmitting(false)
    
  }
  
  return(

    <div className="flex h-screen">
      <div className="flex-1 bg-accent">
        <div className="flex justify-end items-center h-screen">
          <img className="w-[500px]" src={peopleBg} alt="picture" />
        </div>
      </div>
      <div className="flex flex-col max-w-md w-full justify-center items-center gap-8">
        <Link className="w-[80%] flex gap-5" to="/">
          <div>
            <img className="w-12 h-12" src={weTick} alt="wetick-logo"/>
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-bold text-third">We</span>
            <span className="text-3xl font-bold text-secondary">tick</span>
          </div>
        </Link>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            checkbox: false
          }}
          validationSchema={validationSchema}
          onSubmit={doLogin}
        >
          {(props)=>(
            <FormSignUp {...props}/>
          )}
        </Formik>
      </div>
    </div>
  )
  
}
export default SignUp
