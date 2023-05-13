import { Link } from "react-router-dom";
import React from "react";
import http from "../helpers/http";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment"; 
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction} from "../redux/reducers/auth"; 

//IMAGES
import weTick from "../assets/images/wetick-logo.png"
import peopleBg from "../assets/images/picture.png"
import line4 from "../assets/images/Line 4.svg"
import dateIcon from "../assets/images/date-icon.png"
import viewers from "../assets/images/avatars.png"
import jakarta from "../assets/images/Jakarta.png"
import bandung from "../assets/images/Bandung.png"
import bali from "../assets/images/Bali.png"
import aceh from "../assets/images/Aceh.png"
import solo from "../assets/images/Solo.png"
import yogyakarta from "../assets/images/Yogyakarta.png"
import semarang from "../assets/images/Semarang.png"

//ICONS
import { FiAlignJustify } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";

// import drogba from "../assets/images/drogba.jpg"

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [events, setEvents] = React.useState([])
  const [eventCategories, setEventCategories] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [partners, setPartners] = React.useState([])
  const [profile, setProfile] = React.useState({})
  const token = useSelector(state => state.auth.token)

  async function getEventCategories(name){
    const {data} = await http().get('/events', {params: {category: name}})
    setEventCategories(data.results)
  }
  

  React.useEffect(()=>{
    async function getDataEvents(){
      const {data} = await http().get('/events')
      setEvents(data.results)
    }
    getDataEvents()

    getEventCategories()

    async function getDataPartners(){
      const {data} = await http().get('/partners')
      setPartners(data.results)
    }
    getDataPartners()

    async function getProfileData(){
      const {data} = await http(token).get('/profile')
      setProfile(data.results)
    }
    if(token) {
      getProfileData()
    }

    async function getCategories(){
      const {data} = await http().get('/categories')
      setCategories(data.results)
    }
    getCategories()
  },[])

  const doLogout = ()=> {
    dispatch(logoutAction())
    navigate('/login')
  }

  return(
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
                  src={`http://localhost:8888/uploads/${profile.picture}`} alt="profile"/>}
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
        <section className="flex md:flex-row flex-col flex-1 md:px-24 py-10 items-center bg-[#AA7C52] bg-cover bg-no-repeat bg-[url('assets/images/background-circle.svg')] ]">
          <div className="flex-1 flex flex-col gap-5">
            <p className="font-semibold text-xl text-[#000] text-center md:text-6xl max-w-[554px] leading-[96px] ">Find events you love with our</p>
            <div className="block w-full">
              <div className="flex rounded-[20px] bg-white h-[75px]">
                <span className="flex flex-1 justify-between border-0  py-[25px] pl-[25px] pr-0">
                  <i><FiSearch /></i>
                  <input className="font-medium text-xs leading-4" type="text" placeholder="Search Event..." />
                  <i><FiMapPin /></i>
                  <select className="outline-none px-3 appearance-none font-medium text-xs md:min-w-[200px] leading-4">
                    <option disabled="" selected="">Where?</option>
                    <option>Jakarta</option>
                    <option>Bandung</option>
                    <option>Bali</option>
                    <option>Aceh</option>
                    <option>Solo</option>
                    <option>Yogyakarta</option>
                    <option>Semarang</option>
                  </select>

                </span>

                <button
                  className="flex justify-center items-center mr-[25px] w-[45px] h-[45px] bg-[#FFBA7B] rounded-[10px] self-center "
                  type="submit">
                  <span className="text-[#38291B]">
                    <i><FiArrowRight /></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div>
            <img className="people-bg" src={peopleBg} alt="picture-bg-right" />
          </div>
        </section>
      </header>
      <main className="flex flex-col gap-[175px]">
        <div className="flex flex-col mx-[30px] md:mx-[120px] mt-[175px] md:gap-[50px] gap-[5px]">
          <div className="flex flex-col gap-[25px]">
            <div className="w-[150px] h-[30px] bg-[#FFBA7B] border-0 rounded-[30px] px-[30px] py-[8px]">
              <span className="flex text-[#38291B] font-semibold text-xs leading-4">
                <img className="text-[#38291B]" src={line4} alt="line-4" />
                EVENT
              </span>
            </div>
            <div>
              <p className="font-semibold text-4xl leading-[54px]">Event for you</p>
            </div>
          </div>
          <div className="flex justify-between w-[100%]">
            <div id="event-date-layout" className="flex inline-block flex-1 h-[75px] md:gap-[20px] gap-[10px]">
              <div className="w-[45px] h-full rounded-[10px] flex justify-center items-center">
                <span className="rounded-[10px] w-[45px] h-[45px] p-[10px] shadow-[0_2px_15px_rgba(26,60,68,0.08)]">
                  <i><FiArrowLeft/></i>
                </span>
              </div>
              <div className="md:max-w-full max-w-[150px] overflow-x-auto">
                <div className="flex inline-block gap-[25px]">
                  <div className="flex flex-col justify-center items-center w-[50px] h-[75px] text-[#E4C5AA]">
                    <span className="font-semibold text-sm leading-5 tracking-[0.00039375px]">13</span>
                    <span>Mon</span>
                  </div>
                  <div className="flex flex-col justify-center items-center w-[50px] h-[75px] text-[#E4C5AA]">
                    <span className="font-semibold text-sm leading-5 tracking-[0.00039375px]">14</span>
                    <span>Tue</span>
                  </div>
                  <div
                    className="flex flex-col justify-center items-center w-[50px] h-[75px] border-2 border-[#FFBA7B] text-[#FFBA7B] rounded-[16px]">
                    <span className="font-semibold text-sm leading-5 tracking-[0.00039375px]">15</span>
                    <span>Wed</span>
                  </div>
                  <div className="flex flex-col justify-center items-center w-[50px] h-[75px] text-[#E4C5AA]">
                    <span className="font-semibold text-sm leading-5 tracking-[0.00039375px]">16</span>
                    <span>Thu</span>
                  </div>
                  <div className="flex flex-col justify-center items-center w-[50px] h-[75px] text-[#E4C5AA]">
                    <span className="font-semibold text-sm leading-5 tracking-[0.00039375px]">17</span>
                    <span>Fri</span>
                  </div>
                </div>
              </div>
              <div className="w-[45px] h-full rounded-[10px] flex justify-center items-center">
                <span
                  className="bg-[#AA7C52] rounded-[10px] w-[45px] h-[45px] p-[10px] shadow-[0_2px_15px_rgba(26,60,68,0.08)]">
                  <i><FiArrowRight /></i>
                </span>
              </div>

            </div>
            <div className="flex items-center">
              <div className="w-[100px] h-[50px] bg-[#E4C5AA] rounded-[15px] md:flex justify-center items-center">
                <span className="flex inline-block gap-[17px] py-[16px]">
                  <img src={dateIcon} alt="date-icon" />
                  <p className="py-[3px] font-medium text-xs leading-4 tracking-[1px] ">March</p>
                </span>
              </div>
            </div>
          </div>
          <div className="event-banner-wrap">
            {events.map(event => {
              return (
                <Link to={`/event-detail/${event.id}`} key={`event-${event.id}`}>
                  <div className="event-banner">
                    <img src={`http://localhost:8888/uploads/${event.picture}`} />
                    <div className="banner-text">
                      <div className="banner-text-first">{moment(event.date).format(`ddd, MMM Do 'YY, h:mm A`)}</div>
                      <div className="banner-text-second">{event.event}</div>
                      <div className="banner-view-account">
                        <div>
                          <img src={viewers} />
                        </div>
                      </div>
                    </div>
                    {/* <div className="absolute bottom-0 text-white bg-[#AA7C52] p-5">
                      <div className="font-medium text-sm leading-7 tracking-[1px] text-white">{event.date}</div>
                      <div className="font-semibold text-xl leading-7 tracking-[2px] text-white">{event.title}</div>
                    </div> */}
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="below-banner-arrow">
            <div className="left-arrow">
              <i><FiArrowLeft/></i>
            </div>
            <div className="right-arrow">
              <i><FiArrowRight/></i>
            </div>
          </div>
        </div>
        <div id="2nd-main" className="">
          <div className="flex flex-col gap-[50px] bg-[#FFE8D3] md:px-[50px] md:py-[73px] md:m-[50px] m-[5px] rounded-[30px] bg-cover bg-no-repeat bg-[url('assets/images/background-circle.svg')]">
            <div className="w-[150px] h-[30px] bg-[#FFBA7B] border-0 rounded-[30px] px-[30px] py-[8px]">
              <span className="flex text-[#38291B] font-semibold text-xs leading-4">
                <img className="text-[#38291B]" src={line4} alt="line-4" />
                LOCATION
              </span>
            </div>
            <div className="location-grid" >
              <div className="grid-title">
                <p className="font-semibold text-4xl leading-[177.78%] tracking-[1px]">Discover Events Near You</p>
              </div>
              <div className="grid-1" >
                <div className="flex flex-col justify-center">
                  <img src={jakarta} alt="Jakarta" />
                </div>
                <div className="text-center font-medium text-base leading-6 tracking-[1px]">Jakarta</div>
              </div>
              <div className="grid-2">
                <div className="flex flex-col justify-center">
                  <img src={bandung} alt="Bandung" />
                </div>
                <div className="text-center font-medium text-base leading-6 tracking-[1px]">Bandung</div>
              </div>
              <div className="grid-3">
                <div className="flex flex-col justify-center">
                  <img src={bali} alt="Bali"/>
                </div>
                <div className="text-center font-medium text-base leading-6 tracking-[1px]">Bali</div>
              </div>
              <div className="grid-4">
                <div className="flex flex-col justify-center">
                  <img src={aceh} alt="Aceh" />
                </div>
                <div className="text-center font-medium text-base leading-6 tracking-[1px]">Aceh</div>
              </div>
              <div className="grid-5">
                <div className="flex flex-col justify-center">
                  <img src={solo} alt="Solo" />
                </div>
                <div className="text-center font-medium text-base leading-6 tracking-[1px]">Solo</div>
              </div>
              <div className="grid-6">
                <div className="flex flex-col justify-center">
                  <img src={yogyakarta} alt="Yogyakarta" />
                </div>
                <div className="text-center font-medium text-base leading-6 tracking-[1px]">Yogyakarta</div>
              </div>
              <div className="grid-7">
                <div className="flex flex-col justify-center">
                  <img src={semarang} alt="Semarang" />
                </div>
                <div className="text-center font-medium text-base leading-6 tracking-[1px]">Semarang</div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <a href="event.html">
                <button type="submit" className="w-[255px] h-[40px] bg-[#AA7C52] rounded-2xl text-center text-[#FFBA7B]">
                  See All
                </button>
              </a>
            </div>
          </div>
        </div>
        <div id="3rd-main">
          <div className="flex flex-col mx-[30px] md:mx-[120px] gap-[25px]">
            <div className="w-[150px] h-[30px] bg-[#FFBA7B] border-0 rounded-[30px] px-[30px] py-[8px]">
              <span className="flex text-[#38291B] font-semibold text-xs leading-4">
                <img className="text-[#38291B]" src={line4} alt="line-4" />
                EVENT
              </span>
            </div>
            <div>
              <p className="font-semibold text-4xl text-center leading-[54px]">Browse Events By Category</p>
            </div>
            
            <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-[20px] md:w-full my-[20px] ">
              <div className="w-[100%]">
                <div className="flex flex-1 justify-between md:max-w-full max-w-[875px] h-6 gap-[20px] overflow-x-auto" id="categories-list">
                {categories.map(category => {
                  return (
                    <button onClick={()=> getEventCategories(category.name)} key={`category-${category.id}`} className="font-medium text-base leading-6 justify-center text-center min-w-[75px] text-[#C1C5D0] hover:text-secondary hover:border-b-2 hover:border-[#FFBA7B] ">
                      {category.name}
                    </button>
                  )
                })}
                </div>
              </div>
            </div>
            <div className="event-banner-wrap">
              {eventCategories.map(event => {
                return (
                  <Link to={`/event-detail/${event.id}`} key={`event-category-${event.id}`}>
                  <div className="event-banner">
                    <img src={`http://localhost:8888/uploads/${event.picture}`} />
                    <div className="absolute bottom-0 text-white bg-[#AA7C52] p-5">
                      <div className="font-medium text-sm leading-7 tracking-[1px] text-white">{moment(event.date).format(`ddd, MMM Do 'YY, h:mm A`)}</div>
                      <div className="font-semibold text-xl leading-7 tracking-[2px] text-white">{event.event}</div>
                      <div className="top-[-20px] absolute z-50">
                        <div>
                          <img src={viewers} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                )
              })}
              {eventCategories.length < 1 && (
                <div className="text-center font-bold text-3xl">No data</div>
              )}
            </div>
          </div>
        </div>
        <div id="4th-main" className="mb-[175px]">
          <div
            className="flex flex-col justify-center py-10 items-center flex-1 bg-[#000] bg-cover bg-no-repeat bg-[url('assets/images/background-circle.svg')] gap-[25px] md:h-[700px]">
            <div className="w-[150px] h-[30px] bg-[#C1C5D0] border-0 rounded-[30px] px-[30px] py-[8px]">
              <span className="flex text-grey-900 font-semibold text-xs leading-4">
                <img className="text-white" src={line4} alt="line-4" />
                Partner
              </span>
            </div>
            <div>
              <p className="font-semibold text-center text-4xl leading-[54px] text-white">Our Trusted Partners</p>
            </div>
            <div className="text-[#C1C5D0] font-normal text-xs flex items-center text-center leading-[233.33%] tracking-[1px]">
              By companies like :</div>
            <div className="flex md:flex-row flex-col justify-center items-center gap-[50px] md:gap-[65px] mt-[30px]">
              {partners.map(partner => {
                return (
                  <React.Fragment key={partner.id}>
                    <div className="flex md:flex gap-[70px] md:gap-[65px]">
                      <div>
                        <img src={`http://localhost:8888/uploads/${partner.picture}`} />
                      </div>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
      </main>
      
    </>
  )
}
export default Home;