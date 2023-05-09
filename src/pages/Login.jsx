import { Link } from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

//IMAGES
import peopleBg from "../assets/images/picture.png"
import weTick from "../assets/images/wetick-logo.png"

const Login = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = React.useState('')
  const [token, setToken] = React.useState('')
  const doLogin = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    try {
      const {value: email} = event.target.email
      const {value: password} = event.target.password
      const body = new URLSearchParams({email, password}).toString() //mengambil query string
      const {data} = await axios.post('http://localhost:8888/auth/login', body)
      window.localStorage.setItem('token', data.results.token)
      setToken(data.results.token)
    }catch (err) {
      const message = err?.response?.data?.message
      if(message){
        setErrorMessage(message)
      } 
    }

  }
  React.useEffect(()=>{
    if (token){
      console.log('test')
      navigate('/')
    }
  }, [token, navigate])

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
        <div className="w-[80%] flex flex-col gap-5">
          <div className="text-3xl font-bold">Sign In</div>
          <div className="">Hi, Welcome back to Urticket! </div>
          {errorMessage && <div>
            <div className="alert alert-error">{errorMessage}</div>
          </div>}
        </div>
        <form onSubmit={doLogin} className="w-[80%] flex flex-col gap-5">
          <div>
            <input className="input input-bordered border-1 w-full" type="text" name="username" placeholder="Username" />
          </div>
          <div>
            <input className="input input-bordered border-1 w-full" type="email" name="email" placeholder="Email" />
          </div>
          <div>
            <input className="input input-bordered border-1 w-full" type="password" name="password" placeholder="Password" />
          </div>
          <div className="text-right">
            <Link className="hover:text-secondary bold text-[#38291B]"to="/forgot-password">Forgot Password</Link>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="w-full text-center">
              <button className="btn btn-accent hover:btn-secondary btn-block normal-case">Sign In</button>
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
      </div>
      
      
    </div>
  
  )
  

  
}
export default Login;