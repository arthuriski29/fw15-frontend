import React from "react"

import { useLocation, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import http from "../helpers/http"
import { FiUser } from "react-icons/fi"
import { logout as logoutAction} from "../redux/reducers/auth" 

//IMAGES
import weTick from "../assets/images/wetick-logo.png"
import fbGrey from "../assets/images/fb-grey.svg"
import whatsappGrey from "../assets/images/whatsapp-grey.svg"
import igGrey from "../assets/images/ig-grey.svg"
import twitterGrey from "../assets/images/twitter-grey.svg"
import acSelect from "../assets/images/hide-bar.svg"
import creCard from "../assets/images/credit-card.svg"
import addCredit from "../assets/images/add-credit.svg"

//ICONS
import { FiAlignJustify } from "react-icons/fi"
// import { FiFilter } from "react-icons/fi"
function Payment() {
  const {state} = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)
  const [profiles, setProfile] = React.useState({})
  const [methods, setMethods] = React.useState([])
  const [selectedPayment, setSelectedPayment] = React.useState("1")
  console.log(selectedPayment)

  React.useEffect(()=>{
    async function getProfileData(){
      const {data} = await http(token).get("/profile")
      setProfile(data.results)
    }  
    getProfileData()
  }, [token])
  React.useEffect(()=> {
    const getPaymentMethod = async()=> {
      const {data} = await http(token).get("/payment")
      setMethods(data.results)
    }
    getPaymentMethod()
  },[token])

  const doPayment = async(e)=>{
    e.preventDefault()
    const {reservationId} = state
    const form = new URLSearchParams({
      reservationId,
      paymentMethodId: selectedPayment
    }).toString()
    const {data} = await http(token).post("/payment", form)
    console.log(data)
    navigate("/mybooking")
  }
  const doLogout = ()=> {
    dispatch(logoutAction())
  
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
      <main>
        <div id="main-div">
          <form onSubmit={doPayment} >
            <div className="flex justify-center gap-16 my-[50px]">
              <div id="payment-method-wrap">
                <div id="title" className="font-semibold text-xl leading-7">Payment Method</div>
                <div id="payment-method" className="mt-[50px] font-semibold text-sm leading-5">
                  {methods.map(item => (
                    <div key={`payment-method-${item.id}`}>
                      <div id="Card" className="flex mb-[15px]">
                        <span className="mr-[20px]">
                          <img src={acSelect} alt="active-select"/>
                        </span>
                        <span>
                          <FiUser/>
                        </span>
                        <input 
                          className="w-[250px] pl-[15px] pr-[96px]"
                          type="radio" 
                          onChange={(e)=>setSelectedPayment(e.target.value)} 
                          name="paymentMethod" 
                          value={item.id} 
                          defaultChecked={item.id === methods[0].id}/>{item.name}
                        <span>
                          <img src={acSelect} alt="hide-bar"/>
                        </span>
                      </div>
                      <div id="credit-card-displayed" className="mb-[40px]">
                        <div className="flex gap-4">
                          <span>
                            <img src={creCard} alt="credit-card"/>
                          </span>
                          <span>
                            <img src={addCredit} alt="add-credit"/>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* <div id="Bank Transfer" className="flex mb-[40px]">
                    <span className="mr-[20px]">
                      <img src="assets/inactive-select.svg" alt="inactive-select"/>
                    </span>
                    <span>
                      <i data-feather="user"></i>
                    </span>
                    <span className="w-[250px] pl-[15px] pr-[96px]">Bank Transfer</span>
                    <span>
                      <img src="assets/show-bar.svg" alt="show-bar"/>
                    </span>
                  </div>
                  <div id="Retail" className="flex mb-[40px]">
                    <span className="mr-[20px]">
                      <img src="assets/inactive-select.svg" alt="inactive-select"/>
                    </span>
                    <span>
                      <i data-feather="user"></i>
                    </span>
                    <span className="w-[250px] pl-[15px] pr-[96px]">Retail</span>
                    <span>
                      <img src="assets/show-bar.svg" alt="show-bar"/>
                    </span>
                  </div>
                  <div id="E-Money" className="flex mb-[40px]">
                    <span className="mr-[20px]">
                      <img src="assets/inactive-select.svg" alt="inactive-select"/>
                    </span>
                    <span>
                      <i data-feather="user"></i>
                    </span>
                    <span className="w-[250px] pl-[15px] pr-[96px]">E-Money</span>
                    <span>
                      <img src="assets/show-bar.svg" alt="show-bar"/>
                    </span>
                  </div> */}
                </div>
              </div>
              <div id="ticket-details" className="">
                <div id="title" className="font-semibold text-xl leading-7">Ticket Detail</div>
                <div className="w-[363px] mt-[50px] font-semibold text-sm leading-5">
                  <label htmlFor="Ticket Detail">
                    <ul className="flex flex-col gap-[15px]">
                      <li className="flex justify-between">
                        <span className="text-left">Event</span>
                        <span className="text-right text-orange-300">{state.eventName}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-left">Ticket Section</span>
                        <span className="text-right text-orange-300">{state.sectionName}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-left">Quantity</span>
                        <span className="text-right text-orange-300">{state.quantity}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-left">Total Payment</span>
                        <span className="text-right text-orange-300">{state.totalPayment}</span>
                      </li>
                    </ul>
                    <button className="mt-[50px] border-none rounded-2xl px-[20px] shadow-[0px_8px_10px_#38291B] bg-yellow-700 text-orange-300 font-bold no-underline w-full h-10" type="submit">Payment</button>
                  </label>
                </div>
              </div>
            </div>
          </form>

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
      {/* <form onSubmit={doPayment} className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="flex gap-10">
            <div>
              {methods.map(item => (
                <div key={`payment-method-${item.id}`}>
                  <label>
                    <input 
                      type="radio" 
                      onChange={(e)=>setSelectedPayment(e.target.value)} 
                      name="paymentMethod" 
                      value={item.id} 
                      defaultChecked={item.id === methods[0].id} 
                    />
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <div>{state.eventName}</div>
              <div>{state.sectionName}</div>
              <div>{state.quantity}</div>
              <div>{state.totalPayment}</div>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-accent">Pay</button>
          </div>
        </div>
      </form> */}
    </>
  )
}

export default Payment
