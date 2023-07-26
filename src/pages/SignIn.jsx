import { Link } from "react-router-dom"
import {FcGoogle} from "react-icons/fc"
import {FaFacebook} from "react-icons/fa"
import { useNavigate} from "react-router-dom"
// import http from "../helpers/http"
import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import propTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { clearMessage } from "../redux/reducers/auth"

import { asyncLoginAction } from "../redux/actions/auth"

//IMAGES
import peopleBg from "../assets/images/picture.png"
import weTick from "../assets/images/wetick-logo.png"

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid"),
  password: Yup.string().required("Password is invalid")
})

const FormLogin = ({values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting}) => {
  const errorMessage = useSelector(state => state.auth.errorMessage)
  const warningMessage = useSelector(state => state.auth.warningMessage)
  const successMessage = useSelector(state => state.auth.successMessage)
  return (
    <form onSubmit={handleSubmit} className="w-[80%] flex flex-col gap-5">
      <div className="w-[80%] flex flex-col gap-5">
        <div className="text-3xl font-bold">Sign In</div>
        <div className="">Hi, Welcome back to Urticket! </div>
        <div className="flex gap-2">
          <span className="">Don&apos;t have any account?</span>
          <Link className="font-semibold hover:text-secondary" to="/sign-up">SignUp</Link>
        </div>
        {warningMessage && 
        (<div>
          <div className="alert alert-warning">{warningMessage}</div>
        </div> )}
        {successMessage && 
        (<div>
          <div className="alert alert-success">{successMessage}</div>
        </div> )}
        {errorMessage && 
        (<div>
          <div className="alert alert-error">{errorMessage}</div>
        </div> )}
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
      <div className="text-right">
        <Link className="hover:text-secondary bold text-[#38291B]"to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-full text-center">
          <button disabled={isSubmitting} type="submit" className="btn btn-accent hover:btn-secondary btn-block normal-case">Sign In</button>
        </div>
        <div>or sign in with</div>
      </div>
      <div className="flex justify-center gap-5">
        <button className="btn btn-primary bg-white border-primary hover:btn-secondary w-24">
          <FcGoogle size={25} />
        </button>
        <button className="btn btn-primary bg-white border-primary hover:btn-secondary w-24">
          <FaFacebook color='#4267B2' size={25} />
        </button>
      </div>
    </form>
  )
}

FormLogin.propTypes = {
  values: propTypes.objectOf(propTypes.string),
  errors: propTypes.objectOf(propTypes.string),
  touched: propTypes.objectOf(propTypes.bool),
  handleBlur: propTypes.func,
  handleChange: propTypes.func,
  handleSubmit: propTypes.func,
  isSubmitting: propTypes.bool

}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const formError = useSelector(state => state.auth.token)
  
  

  React.useEffect(()=> {
    if(token){
      console.log("test")
      navigate("/")
    }
  }, [token, navigate])

  const doLogin = async (values, {setSubmitting, setErrors}) => {
    dispatch(clearMessage())
    dispatch(asyncLoginAction(values))
    if(formError.length){
      setErrors({
        email: formError.filter(item => item.param === "email")[0].message,
        password: formError.filter(item => item.param === "password")[0].message
      })
    }
    setSubmitting(false)
    // try{

    //   setSubmitting(false)
    // }catch (err) {
    //   const message = err?.response?.data?.message
    //   if(message){
    //     if(err?.response?.data?.results){
    //       setErrors({
    //         email: err.response.data.results.filter(item => param === "email")[0].message,
    //         password: err.response.data.results.filter(item => param === "password")[0].message
    //       })
    //     }else{
    //       dispatch(setErrorMessage(message))
    //     }
    //   } 
    // }
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
            email: "",
            password: ""
          }}
          validationSchema={validationSchema}
          onSubmit={doLogin}
        >
          {(props)=>(
            <FormLogin {...props}/>
          )}
        </Formik>
      </div>
    </div>
  )
  
}
export default Login
