import { Link } from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";

//IMAGES
import peopleBg from "../assets/images/picture.png"

const Login = () => {
  return(
  
    <div className="flex h-screen">
      <div className="flex-1 bg-accent">
        <div className="flex justify-end items-center h-screen">
          <img className="w-[500px]" src={peopleBg} alt="picture" />
        </div>
      </div>
      <div className="flex flex-col max-w-md w-full justify-center items-center gap-8">
        <div className="w-[80%] flex flex-col gap-8">
          <div className="text-3xl font-bold">Sign In</div>
          <div className="">Hi, Welcome back to Urticket! </div>
        </div>
        <form className="w-[80%] flex flex-col gap-5">
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