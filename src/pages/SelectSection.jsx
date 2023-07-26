import React from "react"
import http from "../helpers/http"
import { useDispatch, useSelector } from "react-redux"
import { FiPlus, FiMinus } from "react-icons/fi"
import { Link, useNavigate, useParams } from "react-router-dom"
import { logout as logoutAction} from "../redux/reducers/auth" 

//IMAGES
import weTick from "../assets/images/wetick-logo.png"
import fbGrey from "../assets/images/fb-grey.svg"
import whatsappGrey from "../assets/images/whatsapp-grey.svg"
import igGrey from "../assets/images/ig-grey.svg"
import twitterGrey from "../assets/images/twitter-grey.svg"
// import ticket1 from "../assets/images/ticket-1.png"
import venueTicket from "../assets/images/venue.png"


//ICONS
import { FiAlignJustify } from "react-icons/fi"
// import { FiUser } from "react-icons/fi"
// import { FiCreditCard } from "react-icons/fi"
// import { FiEdit3 } from "react-icons/fi"
// import { FiCheckSquare } from "react-icons/fi"
// import { FiHeart } from "react-icons/fi"
// import { FiSettings } from "react-icons/fi"
// import { FiLogOut } from "react-icons/fi"
// import { FiUnlock } from "react-icons/fi"
// import { FiMinusCircle } from "react-icons/fi"
// import { FiPlusCircle } from "react-icons/fi"
import { FiFilter } from "react-icons/fi"

function SelectSection() {
  const {id: eventId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profiles, setProfile] = React.useState({})
  const [sections, setSections] = React.useState([])
  const [filledSection, setFilledSection] = React.useState({
    id: 0,
    quantity: 0
  })
  const token = useSelector(state => state.auth.token)

  React.useEffect(()=>{
    async function getProfileData(){
      const {data} = await http(token).get("/profile")
      setProfile(data.results)
    }  
    getProfileData()
  }, [])

  const increment = (id) => {
    setFilledSection({
      id,
      quantity: filledSection.quantity + 1
    })
  }

  const decrement = (id) => {
    setFilledSection({
      id,
      quantity: filledSection.quantity - 1
    })
  }

  React.useEffect(()=>{
    const getSections = async()=> {
      const {data} = await http(token).get("/section")
      setSections(data.results)
    }
    getSections()
  },[])

  const doReservation = async()=> {
    const form = new URLSearchParams({
      eventId,
      sectionId: filledSection.id,
      quantity: filledSection.quantity
    }).toString()
    const {data} = await http(token).post("/reservations", form)

    navigate("/payment", {state: {
      eventId,
      eventName: data.results.events.title,
      reservationId: data.results.id,
      sectionName: data.results.sectionName,
      quantity: data.results.quantity,
      totalPayment: data.results.totalPrice
    }})

    
  }
  const doLogout = ()=> {
    dispatch(logoutAction())
  
  }

  const selectedSection = filledSection && sections.filter(item => item.id === filledSection.id)[0]
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
                <i><FiAlignJustify/></i>
              </button>
            </div>
          </div>
          <div id="menu" className="hidden md:flex md:flex-row  flex-col flex-1 w-full md:w-[unset] items-center justify-between font-semibold text-sm leading-5">
            <ul className="flex md:flex-row flex-col text-center gap-5 w-full justify-center">
              <li className="flex justify-center items-center min-w-[100px]"><Link className="hover:text-[#FFBA7B]" to={"/"}>Home</Link></li>
              <li className="flex justify-center items-center min-w-[100px]"><Link className="hover:text-[#FFBA7B]" to="/manage-event">Create Event</Link></li>
              <li className="flex justify-center items-center min-w-[100px]"><a className="hover:text-[#FFBA7B]" href="#location">Location</a></li>
            </ul>
            <div className="flex md:flex-row flex-col gap-3 w-full md:w-[unset]">
              {token ?
                <div className="flex gap-5">

                  <Link to="/profile" className="flex items-center gap-5 font-semibold text-sm leading-5">
                    <div className="inline-block border-transparent rounded-full p-[2px] bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                      {profiles?.picture && <img className="border-[3.38px] border-white object-cover w-[50px] h-[50px] rounded-full" src={profiles.picture.startsWith("https")? profiles.picture : `http://localhost:8888/uploads/${profiles.picture}`}
                        alt={profiles?.fullName}/>}
                    </div>
                    <div className="font-semibold text-sm leading-5">
                      <div>{profiles?.fullName}</div>
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
      <main className="bg-[F4F7FF] flex gap-16 my-[50px]">

        <div className="flex my-12 flex-1 p-[67px] justify-center gap-16">
          <div className="flex justify-center">
            <div>
              <img className="object-contain" src={venueTicket} alt="venue"/>
            </div>
    
          </div>
          <div className="flex flex-col w-[375px]">
            <div className="flex-1 justify-center items-center">
              <div className="flex">
                <div className="flex-1">Tickets</div>
                <div className="flex-1 flex gap-8">
                  <div>By Price</div>
                  <button className="flex">
                    <FiFilter/>
                    Filter
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-[53px] border-b-2 border-gray-800 pb-[24.7px]">
                {/* {sections.map(item => {
                  <React.Fragment key={`section-select-${item.id}`} >
                    <div className="flex flex-col h-[60px]">
                      <div className="flex flex-1 gap-8">
                        <div className="w-[45px] h-[45px] flex flex-row ">
                          <div>
                            <img id="ticket-1" className="w-[51,9%] h-[51,9%]" src={`ticket${item.id}`} alt="ticket-1"/>
                          </div>
              
                        </div>
                        <div className="flex flex-col w-[390px] h-[42px]">
                          <span className="flex-1 font-semibold text-sm tracking-wide justify-self-end w-auto">{item.name}, ROW
                            {item.id}</span>
                          <span className="flex-1 font-normal text-[#666971] text-xs tracking-wide ">12 seats available</span>
                          <span className="flex-1 font-semibold text-xs tracking-wide">Quantity</span>

                        </div>
                        <div className="flex flex-col w-[390px] h-[42px]">
                          <span className="flex-1 font-semibold text-sm tracking-wide justify-self-end text-center">Rp{item.price},-</span>
                          <span className="flex-1 font-normal text-[#666971] text-xs tracking-wide justify-self-end text-center">per
                person</span>
                          <div className="flex-1 justify-self-end text-center">
                            <span>
                              <button className="btn btn-accent" onClick={()=>decrement(item.id)}>
                                <FiMinus />
                              </button>
                            </span>
                            <span>
                              <button className="btn btn-accent" onClick={()=>increment(item.id)}>
                                <FiPlus />
                              </button>
                            </span>
                          </div>

                        </div>
                      </div>

                    </div>
                  </React.Fragment>
                })} */}
                {sections.map(item => (
                  <React.Fragment key={`section-select-${item.id}`}>
                    <div className="flex gap-10">
                      <div>{item.name}</div>
                      <div>{item.price}</div>
                    </div>
                    <div className="flex items-center gap-5">
                      <button className="btn btn-accent" onClick={()=>decrement(item.id)}>
                        <FiMinus />
                      </button>
                      <div className="text-xl">{item.id === filledSection.id ? filledSection.quantity : 0}</div>
                      <button className="btn btn-accent" onClick={()=>increment(item.id)}>
                        <FiPlus />
                      </button>
                    </div>
                  </React.Fragment>
                ))}
                
              </div>

              <div id="unordered-list" className="mt-[20px]">
                <ul className="flex flex-col flex-1">
                  <li className="flex justify-between">
                    <span className="font-semibold text-xs leading-4">Ticket Section</span>
                    <span className="font-semibold text-sm leading-5 text-right text-orange-300">{selectedSection?.name || "-"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-xs leading-4">Quantity</span>
                    <span className="font-semibold text-sm leading-5 text-right text-orange-300">{filledSection?.quantity}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-semibold text-xs leading-4">Total Payment</span>
                    <span className="font-semibold text-sm leading-5 text-right text-orange-300">IDR{(selectedSection?.price * filledSection?.quantity) || "0"}</span>
                  </li>
                </ul>
              </div>
              <div className="mt-[50px]">
                <button onClick={doReservation} className="btn btn-accent border-none rounded-2xl px-[20px] shadow-[0px_8px_10px_#38291B] bg-yellow-700 text-orange-300 font-bold no-underline w-full h-10">Checkout</button>
              </div>
              
            </div>
          </div>
        </div>
      </main>
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


      {/* <div className="flex justify-center items-center flex-col h-screen">
        {sections.map(item => (
          <React.Fragment key={`section-select-${item.id}`}>
            <div className="flex gap-10">
              <div>{item.name}</div>
              <div>{item.price}</div>
            </div>
            <div className="flex items-center gap-5">
              <button className="btn btn-accent" onClick={()=>decrement(item.id)}>
                <FiMinus />
              </button>
              <div className="text-xl">{item.id === filledSection.id ? filledSection.quantity : 0}</div>
              <button className="btn btn-accent" onClick={()=>increment(item.id)}>
                <FiPlus />
              </button>
            </div>
          </React.Fragment>
        ))}
        <div>
          <div>
            <div>Ticket Section</div>
            <div>{selectedSection?.name || "-"}</div>
          </div>
          <div>
            <div>Quantity</div>
            <div>{filledSection?.quantity}</div>
          </div>
          <div>
            <div>Total Payment</div>
            <div>IDR{(selectedSection?.price * filledSection?.quantity) || "0"}</div>
          </div>
          <div></div>
        </div>
        <button onClick={doReservation} className="btn btn-accent">Checkout</button>
      </div> */}
      
    </>
  )
}

export default SelectSection
