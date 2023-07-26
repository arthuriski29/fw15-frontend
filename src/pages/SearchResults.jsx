import { Link } from "react-router-dom"
import React from "react"
import moment from "moment/moment"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout as logoutAction, setWarningMessage} from "../redux/reducers/auth" 
import http from "../helpers/http"

//ICONS
import { FiAlignJustify, FiMapPin, FiSearch } from "react-icons/fi"


//IMAGES
import weTick from "../assets/images/wetick-logo.png"
import viewers from "../assets/images/avatars.png"
import fbGrey from "../assets/images/fb-grey.svg"
import whatsappGrey from "../assets/images/whatsapp-grey.svg"
import igGrey from "../assets/images/ig-grey.svg"
import twitterGrey from "../assets/images/twitter-grey.svg"
// import { Formik } from "formik"


const SearchResults = ()=>{
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [profile, setProfile] = React.useState({})

  const [event, setEvent] = React.useState([])
  const [eventPerPage, setEventPerPage] = React.useState(2)
  const [currentPage, setCurrentPage] = React.useState(1) 

  const [searchInput, setSearchInput] = React.useState("")
  const [cityInput, setcityInput] = React.useState("")
  const [sortInput, setSortInput] = React.useState("")
  const [sortByInput, setSortByInput] = React.useState("")

  const numOfTotalPages = Math.ceil(event.length/eventPerPage)
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1)
  const indexOfLastEvent = currentPage * eventPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventPerPage
  const visibleEvent = event.slice(indexOfFirstEvent, indexOfLastEvent)

  const adjustPage = event.length
  const eventDisplay = [...Array(adjustPage + 1).keys()].slice(1)

  
  const token = useSelector(state => state.auth.token)

  React.useEffect(()=>{
    async function getProfileData(){
      const fallback = (message)=> {
        dispatch(logoutAction())
        dispatch(setWarningMessage(message))
        navigate("/sign-in")
      }
      const {data} = await http(token, fallback).get("/profile")
      setProfile(data.results)
    }
    if(token) {
      getProfileData()
    }
  },[token, dispatch, navigate])

  const doLogout = ()=> {
    dispatch(logoutAction())
    navigate("/sign-in")
  }

  React.useEffect(()=>{
    const getEvent = async ()=>{
      const theUrl = `/events?search=${searchInput}&city=${cityInput}&sort=${sortInput}&sortBy=${sortByInput}&page=&limit=100`
      console.log(theUrl)
      const { data } = await http().get(theUrl)
      
      setEvent(data.results)
      // console.log(event)
    }
    getEvent()
  },[searchInput, cityInput, sortInput, sortByInput])

  
  //ALL INPUT HANDLER
  const onChangeInput = (e) => {
    const inputValue = e.target.value
    setSearchInput(inputValue, {replace: true})
  }
  const handleCityChange = (e) => {
    const inputValue = e.target.value
    setcityInput(inputValue, {replace:true})
  }
  const handleSortByChange = (e) => {
    const inputValue = e.target.value.split(",")
    const sortOpt = inputValue[0]
    const sortByOpt = inputValue[1]
    setSortInput(sortOpt)
    setSortByInput(sortByOpt)
  }
  const prevPageHandler = () => {
    if (currentPage !== 1){
      setCurrentPage(currentPage-1)
    }
  }
  const nextPageHandler = () => {
    if (currentPage !== numOfTotalPages){
      setCurrentPage(currentPage+1)
    }
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
              <li className="flex justify-center items-center min-w-[100px]"><Link className="hover:text-[#FFBA7B]" to={"/"}>Home</Link></li>
              <li className="flex justify-center items-center min-w-[100px]"><Link className="hover:text-[#FFBA7B]" to={"/manage-event"}>Create Event</Link></li>
              <li className="flex justify-center items-center min-w-[100px]"><a className="hover:text-[#FFBA7B]" href="#location">Location</a></li>
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
                      to="/sign-in">Login</Link>
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
      <div className="flex flex-col md:mt-[20px] md:mb-[10px] md:mx-[65px] m-[5px] rounded-[30px]">
        <div className="font-semibold text-4xl leading-[54px]">Search Events</div>
        <div className="flex self-end h-10 gap-8 text-[15px]">
          {/* <Formik initialValues={
            {search:""}
          }>
            {({handleBlur}) =>(
              <form > */}
          <div className="shrink flex border-2 border-[#AA7C52] rounded-xl px-3 gap-4">
            <div className="self-center"><i><FiSearch /></i></div>
            <div className="self-center">
              <input className="border-none focus:outline-none" name="search"  onChange={onChangeInput} type="text" placeholder="Find Events... " />
            </div>
          </div>
          <div className="flex h-full items-center border-2 border-[#AA7C52] rounded-xl px-3 py-2 gap-4">
            <div className="self-center"><i><FiMapPin /></i></div>
            <select 
              name="city"
              id="select-search" 
              className=" hover:cursor-pointer"
              onChange = {handleCityChange}
            >
              <option value="" disabled>Select City</option>
              <option value="" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">All Cities</option>
              <option value="Jakarta" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer" >Jakarta</option>
              <option value="Bandung" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Bandung</option>
              <option value="Yogyakarta" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Yogyakarta</option>
              <option value="Solo" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Solo</option>
              <option value="Bandung" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Bandung</option>
              <option value="Bali" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Bali</option>
              <option value="Aceh" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Aceh</option>
              <option value="Semarang" className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Semarang</option>
            </select>
          </div>
          {/* </form>
            )}
          </Formik>  */}
          <div className="flex h-full items-center">
            <select name="sortOptions"
              id="select-search" 
              defaultValue="" 
              className="border-2 border-[#AA7C52] rounded-xl px-5 py-2 hover:cursor-pointer "
              onChange={handleSortByChange}
            >
              {/* <option value="" disabled> SortBy</option>
              <option value="A" disabled> SortBy</option>
              <option value="B" disabled> SortBy</option> */}
              <option value="" disabled>Sort By</option>
              <option value={["title", "ASC"]} className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Ascending</option>
              <option value={["title", "DESC"]}  className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Descending</option>
              <option value={["createdAt", "ASC"]}  className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Oldest</option>
              <option value={["createdAt", "DESC"]}  className="hover:bg-[#FFBA7B] hover:text-[#000] hover:cursor-pointer">Latest</option>
            </select>
          </div>
        </div>
        <div className="flex self-end h-10 gap-8 text-[15px]">
          <div className="flex justify-end mt-4 mr-20 gap-5">
            <button className="border-2 hover:border-[#FFBA7B] px-2" onClick={()=> prevPageHandler()}>--prev</button>
            <p>
              {pages.map((page)=> {
                return (
                  <span 
                    key={page}
                    onClick={()=> setCurrentPage(page)}
                    className={`${currentPage === page ? "text-xl text-red-800" : "hover:cursor-pointer hover:text-[#FFBA7B]"}`}
                  >
                    {` ${page} |`}
                  </span>
                )
              })}
            </p>
            <button className="border-2 hover:border-[#FFBA7B] px-2" onClick={()=> nextPageHandler()}>next--</button>
          </div>
          <div className="flex justify-end mt-4 gap-5">
            <p>event per page</p>
            <select name="" id="" defaultValue={adjustPage} onChange={(e)=> setEventPerPage(e.target.value)}>
              {eventDisplay.map((adjust)=> {
                return (
                  <option key={adjust} value={adjust}>{`${adjust}`}</option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[50px] bg-accent px-10 py-12 md:px-[50px] md:py-[73px] md:mx-[50px] md:mb-[50px] md:mt-[10px] m-[5px] rounded-[30px] bg-cover bg-no-repeat bg-[url('assets/images/background-circle.svg')]">
        <div className="max-h-[360] w-full flex flex-wrap gap-5 items-center justify-center ">
          
          {visibleEvent.length >= 1 ? 
            visibleEvent.map(event => {
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
            })
            : 
            <div className= "flex flex-col gap-2">
              <div className= "font-semibold text-2xl leading-[54px]"> No Events Found :&#40;</div>
              <div className= "font-medium text-m leading-[14px]"> no events match in the searchbar</div>
            </div>
          }
        </div>

      </div>
      <footer className="flex flex-col md:gap-0 gap-[50px] md:justify-items-center md:mx-[218px] md:h-[308px]">

        <div className="flex-1 flex flex-col md:flex-row justify-items-center md:mx-0 mx-[30px] gap-[50px] md:gap-[125px]">
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center text-2xl font-bold gap-px tracking-wider">
              <img className="w-12 h-12" src={weTick} alt="wetick-logo"/>
              <span className="text-[#38291B]">We</span>
              <span className="text-[#FFBA7B]">tick</span>
            </div>
            <div className="mt-[15px] font-medium text-base tracking-wide leading-4">Find event you love with our</div>
            <div className="flex gap-[20px]">
              <span>
                <img className="w-5 h-5" src={fbGrey} alt="fb-grey"/>
              </span>
              <span>
                <img className="w-5 h-5" src={whatsappGrey} alt="whatsapp-grey"/>
              </span>
              <span>
                <img className="w-5 h-5" src={igGrey} alt="ig-grey"/>
              </span>
              <span>
                <img className="w-5 h-5" src={twitterGrey} alt="twitter-grey" />
              </span>
            </div>
          </div>


          <div className="flex flex-1 flex-col gap-[20px]">
            <span className="font-semibold text-base tracking-wide">Wetick</span>
            <ul className="flex flex-col gap-[15px] font-medium text-sm leading-5 tracking-wide text-[#C1C5D0]">
              <li>About Us</li>
              <li>Features</li>
              <li>Blog</li>
              <li>Payments</li>
              <li>Mobile App</li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <span className="font-semibold text-base tracking-wide">Features</span>
            <ul className="flex flex-col gap-[15px] font-medium text-sm leading-5 tracking-wide text-[#C1C5D0]">
              <li>Booking</li>
              <li>Create Events</li>
              <li>Discover</li>
              <li>Register</li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <span className="font-semibold text-base tracking-wide">Company</span>
            <ul className="flex flex-col gap-[15px] font-medium text-sm leading-5 tracking-wide text-[#C1C5D0]">
              <li>Partnership</li>
              <li>Help</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Sitemap</li>
            </ul>
          </div>

        </div>
        <div
          className="md:w-[306] md:h-[24px] md:mt-[-100px] md:mb-[50px] m-[30px] font-medium text-base tracking-wide leading-4">
          © 2020 Wetick All Rights Reserved
        </div>

      </footer>

    </div>
  )
}

export default SearchResults
