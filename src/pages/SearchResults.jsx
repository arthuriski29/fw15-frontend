import { Link } from "react-router-dom"
import React from "react"
import moment from "moment/moment"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout as logoutAction, setWarningMessage} from "../redux/reducers/auth" 
import http from "../helpers/http"

//ICONS
import { FiAlignJustify } from "react-icons/fi"

//IMAGES
import weTick from "../assets/images/wetick-logo.png"
import viewers from "../assets/images/avatars.png"

// import { FiArrowLeft } from "react-icons/fi"

const SearchResults = ()=>{
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [searchParams] = useSearchParams()
  const [searchResults, setSearchResults] = React.useState([])

  
  const [profile, setProfile] = React.useState({})
  // const [events, setEvents] = React.useState([])
  const token = useSelector(state => state.auth.token)

  React.useEffect(()=> {
    const getEventBySearch = async()=> {
      const {data} = await http().get("/events", {params: searchParams})
      setSearchResults(data.results)
    }
    getEventBySearch()

    async function getProfileData(){
      const fallback = (message)=> {
        dispatch(logoutAction())
        dispatch(setWarningMessage(message))
        navigate("/login")
      }
      const {data} = await http(token, fallback).get("/profile")
      setProfile(data.results)
    }
    if(token) {
      getProfileData()
    }

    // async function getDataEvents(){
    //   const {data} = await http().get("/events")
    //   setEvents(data.results)
    // }
    // getDataEvents()

  }, [])

  const doLogout = ()=> {
    dispatch(logoutAction())
    navigate("/login")
  }

  return (
    <div>
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
                <i><FiAlignJustify/></i>
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
              {token ? 
                <div className="flex gap-5">
                  <Link to="/profile" className="flex items-center gap-5 font-semibold text-sm leading-5">
                    <div className="p-[2px] border-transparent rounded-full bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                      {profile.picture && <img className="border-[3.38px] border-white object-cover w-11 h-11 rounded-full"
                        src={profile.picture.startsWith("https")? profile?.picture : `http://localhost:8888/uploads/${profile?.picture}`} alt={profile?.fullName}/>}
                    </div>
                    <div className="font-semibold text-sm leading-5">
                      <div>{profile?.fullName}</div>
                    </div>
                  </Link>
                  <button onClick={doLogout} className="btn btn-primary">Log Out</button>
                </div>
                :
                <div className="flex gap-3">
                  <div className="w-full">
                    <Link className="text-[#38291B] hover:text-white hover:bg-[#38291B] w-full min-w-[120px] inline-block text-center py-2 font-bold rounded"
                      to="/login">Login</Link>
                  </div>
                  <div className="w-full">
                    <Link className="bg-[#AA7C52] hover:bg-[#FFBA7B] w-full min-w-[120px] inline-block text-center py-2 text-white hover:text-[#38291B] font-bold rounded"
                      to="/signup">Sign Up</Link>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </header>
      <div className="event-banner-wrap">
        {searchResults.map(event => {
          return (
            <Link to={`/event-detail/${event.id}`} key={`event-${event.id}`}>
              <div className="event-banner">
                {event.picture && <img src={event.picture.startsWith("https")? event?.picture : `http://localhost:8888/uploads/${event.picture}`} alt={event.event}/>}
                <div className="banner-text">
                  <div className="banner-text-first">{moment(event.date).format("ddd, MMM Do 'YY, h:mm A")}</div>
                  <div className="banner-text-second">{event.event}</div>
                  <div className="banner-view-account">
                    <div>
                      <img src={viewers} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SearchResults
