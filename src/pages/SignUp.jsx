import { Link } from "react-router-dom"

//IMAGES
import peopleBg from "../assets/images/picture.png"
import weTick from "../assets/images/wetick-logo.png"

const SignUp = () => {
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
        <div className="w-[80%] flex flex-col gap-4">
          <div className="text-2xl font-bold">Sign Up</div>
          <div className="flex gap-2">
            <span className="">Already have an account?</span>
            <Link className="font-semibold hover:text-secondary" to="/login">Login</Link>
          </div>
        </div>
        <form className="w-[80%] flex flex-col gap-5">
          <div>
            <input className="input input-bordered border-1 w-full" type="text" name="Fullname" placeholder="Full Name" />
          </div>
          <div>
            <input className="input input-bordered border-1 w-full" type="email" name="email" placeholder="Email" />
          </div>
          <div>
            <input className="input input-bordered border-1 w-full" type="password" name="password" placeholder="Password" />
          </div>
          <div>
            <input className="input input-bordered border-1 w-full" type="password" name="cfr-password" placeholder="Confirm Password" />
          </div>
          <div>
            <label id="input-checkbox" className="signup-label">
              <input id="checkbox" type="checkbox" />
              Accept terms and condition
              <div className="error"></div>
            </label>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="w-full text-center">
              <button className="btn btn-accent text-secondary hover:btn-secondary hover:text-third btn-block normal-case">Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  
  )
}
export default SignUp