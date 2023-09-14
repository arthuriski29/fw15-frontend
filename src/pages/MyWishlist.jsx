// import React from "react"
// import { useSelector } from "react-redux"
// import http from "../helpers/http"

// function MyBooking() {
//   const [wishlist, setWishlist] = React.useState([])
//   const token = useSelector(state => state.auth.token)
//   React.useEffect(() => {
//     const getHistoryData = async () => {
//       const {data} = await http(token).get("/history")
//       setWishlist(data.results)
//     }
//     getHistoryData()
//   },[])
//   return (
//     <>
//       <div>
//         {wishlist.map(history => (
//           <div key={`history-list-${history.id}`}>
//             <div>{history.title}</div>
//             <div>{history.location}</div>
//             <div>{history.date}</div>
//             <div>Detail</div>
//           </div>
//         ))}
//       </div>
//     </>
//   )
// }

// export default MyBooking

import { Link } from "react-router-dom";
import React from "react";
import http from "../helpers/http";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import {
  logout as logoutAction,
  setWarningMessage,
} from "../redux/reducers/auth";

// IMAGES
import weTick from "../assets/images/wetick-logo.png";

import fbGrey from "../assets/images/fb-grey.svg";
import whatsappGrey from "../assets/images/whatsapp-grey.svg";
import igGrey from "../assets/images/ig-grey.svg";
import twitterGrey from "../assets/images/twitter-grey.svg";

//ICONS
import { FiAlignJustify } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import { FiEdit3 } from "react-icons/fi";
import { FiCheckSquare } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { FiUnlock } from "react-icons/fi";
// import { Formik } from "formik"

const MyWishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [profile, setProfile] = React.useState({});
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    async function getProfileData() {
      const fallback = (message) => {
        dispatch(logoutAction());
        dispatch(setWarningMessage(message));
        navigate("/sign-in");
      };
      const { data } = await http(token, fallback).get("/profile");
      setProfile(data.results);
    }
    if (token) {
      getProfileData();
    }

    const getHistoryData = async () => {
      const { data } = await http(token).get("/wishlist");
      console.log(data.results);
      setWishlist(data.results);
    };
    getHistoryData();
  }, []);
  const doLogout = () => {
    dispatch(logoutAction());
    navigate("/sign-in");
  };

  return (
    <>
      <header className="flex flex-col">
        <div className="flex md:flex-row flex-col justify-center md:justify-between items-center min-h-[3.5rem] px-8">
          <div className="text-left text-2xl font-bold tracking-wide w-full md:w-[unset] flex justify-between items-center">
            <div className="flex">
              <div>
                <img className="w-12 h-12" src={weTick} alt="wetick-logo" />
              </div>
              <div className="flex items-center">
                <span className="text-[#38291B]">We</span>
                <span className="text-[#FFBA7B]">tick</span>
              </div>
            </div>
            <div className="md:hidden">
              <button
                id="menu-toggler"
                className="border-2 border-black px-4 py-2 rounded-xl"
              >
                <i>
                  <FiAlignJustify />
                </i>
              </button>
            </div>
          </div>
          <div
            id="menu"
            className="hidden md:flex md:flex-row  flex-col flex-1 w-full md:w-[unset] items-center justify-between font-semibold text-sm leading-5"
          >
            <ul className="flex md:flex-row flex-col text-center gap-5 w-full justify-center">
              <li className="flex justify-center items-center min-w-[100px]">
                <Link className="hover:text-[#FFBA7B]" to="/">
                  Home
                </Link>
              </li>
              <li className="flex justify-center items-center min-w-[100px]">
                <Link className="hover:text-[#FFBA7B]" to="/">
                  Create Event
                </Link>
              </li>
              <li className="flex justify-center items-center min-w-[100px]">
                <Link className="hover:text-[#FFBA7B]" to="/">
                  Location
                </Link>
              </li>
            </ul>
            <div className="flex md:flex-row flex-col gap-3 w-full md:w-[unset]">
              {token ? (
                <div className="flex gap-5">
                  <Link
                    to="/profile"
                    className="flex items-center gap-5 font-semibold text-sm leading-5"
                  >
                    <div className="p-[2px] border-transparent rounded-full bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                      {profile.picture && (
                        <img
                          className="border-[3.38px] border-white object-cover w-11 h-11 rounded-full"
                          src={
                            profile.picture.startsWith("https")
                              ? profile?.picture
                              : `http://localhost:8888/uploads/${profile?.picture}`
                          }
                          alt={profile?.fullName}
                        />
                      )}
                    </div>
                    <div className="font-semibold text-sm leading-5">
                      <div>{profile?.fullName}</div>
                    </div>
                  </Link>
                  <button onClick={doLogout} className="btn btn-primary">
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <div className="w-full">
                    <Link
                      className="text-[#38291B] hover:text-white hover:bg-[#38291B] w-full min-w-[120px] inline-block text-center py-2 font-bold rounded"
                      to="/sign-in"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="w-full">
                    <Link
                      className="bg-[#AA7C52] hover:bg-[#FFBA7B] w-full min-w-[120px] inline-block text-center py-2 text-white hover:text-[#38291B] font-bold rounded"
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex">
        <aside className="ml-[70px] mt-[50px] font-semibold text-sm leading-5">
          <div className="flex gap-[15px]">
            <div>
              <div className="inline-block border-transparent rounded-full p-[2px] bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                {profile.picture && (
                  <img
                    className="border-[3.38px] border-white object-cover w-11 h-11 rounded-full"
                    src={
                      profile.picture.startsWith("https")
                        ? profile.picture
                        : `http://localhost:8888/uploads/${profile.picture}`
                    }
                    alt={profile?.picture}
                  />
                )}
              </div>
            </div>
            <div>
              <div>{profile.fullName}</div>
              <div className="font-normal text-xs leading-4 text-[#666971]">
                {profile.profession}, {profile.nationality}
              </div>
            </div>
          </div>

          <ul className="mt-14 flex flex-col gap-8">
            <li className="flex gap-[26.5px] hover:text-secondary">
              <i>
                <FiUser />
              </i>
              Profile
            </li>
            <ul className="ml-12 flex flex-col gap-8">
              <li
                className="flex gap-[26.5px] hover:text-secondary"
                id="strikethrough"
              >
                <i>
                  <FiCreditCard />
                </i>
                Card
              </li>
              <li className="flex gap-[26.5px] hover:text-secondary text-[#FFBA7B]">
                <i>
                  <FiEdit3 />
                </i>
                <Link to={"/profile"}>Edit Profile</Link>
              </li>
              <li className="flex gap-[26.5px]">
                <i>
                  <FiUnlock />
                </i>
                <a href="change-password.html">Change Password</a>
              </li>
            </ul>
            <li className="flex gap-[26.5px] hover:text-secondary">
              <i>
                <FiCheckSquare />
              </i>
              <Link to={"/mybooking"}>My Booking</Link>
              {/* <a href="my-booking.html">My Booking</a> */}
            </li>
            <li className="flex gap-[26.5px] hover:text-secondary">
              <i>
                <FiHeart />
              </i>
              <Link to={"/mywishlist"}>My Wishlist</Link>
            </li>
            <li className="flex gap-[26.5px] hover:text-secondary">
              <i>
                <FiSettings />
              </i>
              Settings
            </li>
            <li className="flex gap-[26.5px] text-[#F03800]">
              <i>
                <FiLogOut />
              </i>
              Logout
            </li>
          </ul>
        </aside>
        <div className="flex w-[926px] h-[825px] my-12 mx-[70px]">
          <div className="flex flex-col px-[50px] pt-[46px] rounded-[30px] w-full bg-[#FFE8D3]">
            <div id="upper-title" className="flex justify-between mb-[50px]">
              <div className="font-semibold text-xl leading-6">My Wishlist</div>
              <div className="font-semibold text-xl leading-6">
                {/* <a href="create-event.html" className="underline underline-offset-8 text-[#AA7C52]">Create </a> */}
              </div>
            </div>
            <div className="overflow-auto" id="wishlist">
              {wishlist ? (
                wishlist.map((event) => {
                  return (
                    <div key={`wishlist-${event.id}`}>
                      <div className="flex gap-[25px] py-[25px] border-b-2 border-gray-800">
                        <div id="event-schedule-date">
                          <div className="date-1">
                            <span
                              id="date-number"
                              className="font-semibold text-sm text-[#FFBA7B] leading-5"
                            >
                              {moment(event.date).format("ddd")}
                            </span>
                            <span
                              id="date-day"
                              className="font-medium text-xs leading-4 text-[#C1C5D0]"
                            >
                              {moment(event.date).format("DD")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="event-schedule"
                            className="font-semibold text-2xl leading-9 mb-[15px]"
                          >
                            {event.event}
                          </label>
                          <ul>
                            <li>{event.city}</li>
                            <li>
                              {moment(event.date).format(
                                "ddd, MMM Do 'YY, h:mm A"
                              )}
                            </li>
                            <li className="flex gap-3.5">
                              <Link to={`/event-detail/${event.id}`}>
                                <label
                                  htmlFor={`detail-event-${event.id}`}
                                  className="text-[#AA7C52] underline underline-offset-2  "
                                >
                                  Detail
                                </label>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-2xl leading-[54px]">
                    {" "}
                    No Booked Event :&#40;
                  </div>
                  <div className="font-medium text-m leading-[14px]">
                    {" "}
                    you have&rsquo;nt book any event yet
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div></div>
      </main>
      <footer className="flex flex-col md:gap-0 gap-[50px] md:justify-items-center md:mx-[218px] md:h-[308px]">
        <div className="flex-1 flex flex-col md:flex-row justify-items-center md:mx-0 mx-[30px] gap-[50px] md:gap-[125px]">
          <div className="flex flex-col gap-[15px]">
            <div className="flex items-center text-2xl font-bold gap-px tracking-wider">
              <img className="w-12 h-12" src={weTick} alt="wetick-logo" />
              <span className="text-[#38291B]">We</span>
              <span className="text-[#FFBA7B]">tick</span>
            </div>
            <div className="mt-[15px] font-medium text-base tracking-wide leading-4">
              Find event you love with our
            </div>
            <div className="flex gap-[20px]">
              <span>
                <img className="w-5 h-5" src={fbGrey} alt="fb-grey" />
              </span>
              <span>
                <img
                  className="w-5 h-5"
                  src={whatsappGrey}
                  alt="whatsapp-grey"
                />
              </span>
              <span>
                <img className="w-5 h-5" src={igGrey} alt="ig-grey" />
              </span>
              <span>
                <img className="w-5 h-5" src={twitterGrey} alt="twitter-grey" />
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-[20px]">
            <span className="font-semibold text-base tracking-wide">
              Wetick
            </span>
            <ul className="flex flex-col gap-[15px] font-medium text-sm leading-5 tracking-wide text-[#C1C5D0]">
              <li>About Us</li>
              <li>Features</li>
              <li>Blog</li>
              <li>Payments</li>
              <li>Mobile App</li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <span className="font-semibold text-base tracking-wide">
              Features
            </span>
            <ul className="flex flex-col gap-[15px] font-medium text-sm leading-5 tracking-wide text-[#C1C5D0]">
              <li>Booking</li>
              <li>Create Events</li>
              <li>Discover</li>
              <li>Register</li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <span className="font-semibold text-base tracking-wide">
              Company
            </span>
            <ul className="flex flex-col gap-[15px] font-medium text-sm leading-5 tracking-wide text-[#C1C5D0]">
              <li>Partnership</li>
              <li>Help</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Sitemap</li>
            </ul>
          </div>
        </div>
        <div className="md:w-[306] md:h-[24px] md:mt-[-100px] md:mb-[50px] m-[30px] font-medium text-base tracking-wide leading-4">
          © 2020 Wetick All Rights Reserved
        </div>
      </footer>
    </>
  );
};
export default MyWishlist;
