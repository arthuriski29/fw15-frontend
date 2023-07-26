import React from "react"
import { Link } from "react-router-dom"
import propTypes from "prop-types"
import http from "../helpers/http"
import { useNavigate } from "react-router-dom"

//IMAGES
import weTick from "../assets/images/wetick-logo.png"

const Navbar = (props)=>{
  const [navbar, setNavbar] = React.useState(0)
  const [errorMessage, setErrorMessage] = React.useState("")
  const {onChangeNumber} = props

  const navigate = useNavigate()
  const [profile, setProfile] = React.useState({})
  const [token, setToken] = React.useState("")

  React.useEffect(()=>{
    
    async function getProfileData(){
      const token = window.localStorage.getItem("token")
      const {data} = await http(token).get("/profile")
      setProfile(data.results)
    }
    getProfileData()

    if(window.localStorage.getItem("token")){
      setToken(window.localStorage.getItem("token"))
    }
  },[])

  const doLogout = ()=> {
    window.localStorage.removeItem("token")
    navigate("/sign-in")
  }

  return (
    <>
      <header className="flex flex-col">
        <div className="flex md:flex-row flex-col justify-center md:justify-between items-center min-h-[3.5rem] px-8">
          <div className="text-left text-2xl font-bold tracking-wide w-full md:w-[unset] flex justify-between items-center">
            <div className="flex">
              <div>
                <img className="w-12 h-12" src={weTick} alt="wetick-logo"/>
              </div>
              <div className="flex items-center">
                <span className="text-[#38291B]">We</span>
                <span className="text-[#FFBA7B]">tick</span>
              </div>
            </div>
            <div className="md:hidden">
              <button id="menu-toggler" className="border-2 border-black px-4 py-2 rounded-xl">
                <i data-feather="align-justify"></i>
              </button>
            </div>
          </div>
          <div id="menu" className="hidden md:flex md:flex-row  flex-col flex-1 w-full md:w-[unset] items-center justify-between font-semibold text-sm leading-5">
            <ul className="flex md:flex-row flex-col text-center gap-5 w-full justify-center">
              <li className="flex justify-center items-center min-w-[100px]"><a className="hover:text-[#FFBA7B]" href="home.html">Home</a></li>
              <li className="flex justify-center items-center min-w-[100px]"><a className="hover:text-[#FFBA7B]" href="create-event.html">Create Event</a></li>
              <li className="flex justify-center items-center min-w-[100px]"><a className="hover:text-[#FFBA7B]" href="event.html">Location</a></li>
            </ul>
            <div className="flex md:flex-row flex-col gap-3 w-full md:w-[unset]">
              <div className="flex gap-5">
                <Link to="/profile" className="flex items-center gap-5 font-semibold text-sm leading-5">
                  <div className="p-[2px] border-transparent rounded-full bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                    <img className="border-[3.38px] border-white object-cover w-11 h-11 rounded-full" src="assets/images/profile-picture-1.jpg"
                      alt="profile"/>
                  </div>
                  <div className="font-semibold text-sm leading-5">
                    <div>{profile?.fullName}</div>
                  </div>
                </Link>
                <button onClick={doLogout} className="btn btn-primary">Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
    
  )
}

Navbar.propTypes = {
  onChangeNumber: propTypes.function
}

export default Navbar
