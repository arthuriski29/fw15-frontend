import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import http from "../helpers/http";

import { setWarningMessage } from "../redux/reducers/auth";

import { logout as logoutAction} from "../redux/reducers/auth"; 

//IMAGES
import weTick from "../assets/images/wetick-logo.png"
import fbGrey from "../assets/images/fb-grey.svg"
import whatsappGrey from "../assets/images/whatsapp-grey.svg"
import igGrey from "../assets/images/ig-grey.svg"
import twitterGrey from "../assets/images/twitter-grey.svg"

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


const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const [profiles, setProfile] = React.useState({})

  
  React.useEffect(()=>{
    async function getProfileData(){
      const {data} = await http(token).get('/profile')
      setProfile(data.results)
    }
      getProfileData()
  }, [])
  // React.useEffect(()=>{
  //   const getProfileData = async () => {
  //     const {data} = await http(token).get('/profile')
  //     setProfile(data.results)
  //   }
  //     getProfileData()
  // }, [])

  React.useEffect(()=> {
    if(!token){
      dispatch(setWarningMessage('You have to login first'))
      navigate('/login')
    }
  }, [token])

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
                    <div className="inline-block border-transparent rounded-full p-[2px] bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                      {profiles?.picture && <img className="border-[3.38px] border-white object-cover w-[50px] h-[50px] rounded-full" src={`http://localhost:8888/uploads/${profiles.picture}`}
                        alt="profile"/>}
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
      <main className="flex">
        <aside className="ml-[70px] mt-[50px] font-semibold text-sm leading-5">
          <div className="flex gap-[15px]">
            <div>
              <div
                className="inline-block border-transparent rounded-full p-[2px] bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                {profiles.picture && <img className="border-[3.38px] border-white object-cover w-11 h-11 rounded-full"
                  src={`http://localhost:8888/uploads/${profiles.picture}`} alt="profile"/>}
              </div>
            </div>
            <div>
              <div>{profiles.fullName}</div>
              <div className="font-normal text-xs leading-4 text-[#666971]">{profiles.profession}, {profiles.nationality}</div>
            </div>
          </div>
          
          <ul className="mt-14 flex flex-col gap-8">
            <li className="flex gap-[26.5px] hover:text-secondary"><i><FiUser/></i>Profile</li>
            <ul className="ml-12 flex flex-col gap-8">
              <li className="flex gap-[26.5px] hover:text-secondary" id="strikethrough"><i><FiCreditCard/></i>Card</li>
              <li className="flex gap-[26.5px] hover:text-secondary text-[#FFBA7B]"><i><FiEdit3/></i><a href="edit-profile.html">Edit Profile</a></li>
              <li className="flex gap-[26.5px]"><i><FiUnlock/></i><a href="change-password.html">Change Password</a></li>
            </ul>
            <li className="flex gap-[26.5px] hover:text-secondary"><i><FiCheckSquare/></i><a href="my-booking.html">My Booking</a></li>
            <li className="flex gap-[26.5px] hover:text-secondary"><i><FiHeart/></i><a href="my-wishlist.html">My Wishlist</a></li>
            <li className="flex gap-[26.5px] hover:text-secondary"><i><FiSettings/></i>Settings</li>
            <li className="flex gap-[26.5px] text-[#F03800]"><i><FiLogOut/></i>Logout</li>
          </ul>
        </aside>
        <div id="profile-tab" className="flex my-12 mx-[70px]">
          <div id="profile-tab-wrap" className="px-[50px] py-[46px] rounded-[30px] bg-[#DED6C6]">
            <div className="mb-[50px] font-semibold text-xl leading-6">Profile</div>
            <div className="flex gap-[50px] font-normal text-sm leading-5">
              <div id="profile-list" className="flex flex-col w-[468px]">
                <form className="w-full flex flex-col gap-[50px]">
                  <div id="name" className="flex gap-8">
                    <label htmlFor="name" className="w-[130px] py-[5px]">Name</label>
                    <div className="w-[213px] h-[30px] rounded-[12.5px] pl-[10px] bg-[#fff] py-[3px]">
                      <input type="text" id="name-input" placeholder={profiles.fullName}/>
                    </div>
                  </div>
                  <div id="username" className="flex gap-8">
                    <label htmlFor="username" className="w-[130px] py-[5px]">Username</label>
                    <div className="h-[30px] pl-[10px]  py-[3px]">
                      <input className="bg-[#DED6C6]" type="text" id="username-input" placeholder={`@${profiles.fullName}`.toLowerCase()} />
                    </div>
                    <a href="#">Edit</a>
                  </div>
                  <div id="email" className="flex gap-8">
                    <label htmlFor="email" className="w-[130px] py-[2px]">Email</label>
                    <div className="h-[30px] pl-[10px]  py-[3px]">
                      <input className="bg-[#DED6C6]" type="email" id="email-input" placeholder={profiles.email} />
                    </div>
                    <a href="#">Edit</a>
                  </div>
                  <div id="phone-number" className="flex gap-8">
                    <label htmlFor="phone-number" className="w-[130px] py-[2px]">Phone Number</label>
                    <div className="h-[30px] pl-[10px]  py-[3px]">
                      <input className="bg-[#DED6C6]" type="tel" id="phone-input" placeholder="+62xx.." />
                    </div>
                    <a href="#">Edit</a>
                  </div>
                  <div id="gender" className="flex gap-8">
                    <label htmlFor="gender" className="w-[130px] py-[2px]">Gender</label>
                    <input type="radio" name="gender" id="gender-male" value="Male"/><label htmlFor="gender-1">Male</label>
                    <input type="radio" name="gender" id="gender-female" value="Female"/><label htmlFor="gender-2">Female</label>
                  </div>
                  <div id="profession" className="flex gap-8">
                    <label htmlFor="profession" className="w-[130px] py-[2px]">Profession</label>
                    <select className="w-[213px]" id="profession-select">
                      <option value="" disabled selected>Entrepreneur</option>
                      <option value="1">Artist</option>
                      <option value="2">Business Analyst</option>
                      <option value="3">Construction Worker</option>
                      <option value="4">Designer</option>
                      <option value="5">Entrepreneur</option>
                      <option value="6">Freelancer</option>
                      <option value="7">Social Worker</option>
                      <option value="8">Elite Wrestler</option>
                      <option value="9">Football Player</option>
                    </select>
                  </div>
                  <div id="nationality" className="flex gap-8">
                    <label htmlFor="nationality" className="w-[130px] py-[2px]">Nationality</label>
                    <select id="nationality-select">
                      <option value="" disabled selected>Indonesia</option>
                      <option value="afghanistan">Afghanistan</option>
                      <option value="albania">Albania</option>
                      <option value="algeria">Algeria</option>
                      <option value="american">American</option>
                      <option value="andorra">Andorra</option>
                      <option value="angola">Angola</option>
                      <option value="antigua">Antigua</option>
                      <option value="argentina">Argentina</option>
                      <option value="armenia">Armenian]</option>
                      <option value="australia">Australia</option>
                      <option value="austria">Austria</option>
                      <option value="azerbaijan">Azerbaijan</option>
                      <option value="bahama">Bahama</option>
                      <option value="bahrain">Bahrain</option>
                      <option value="bangladesh">Bangladesh</option>
                      <option value="barbados">Barbados</option>
                      <option value="barbuda">Barbuda</option>
                      <option value="belarusia">Belarusia</option>
                      <option value="belgia">Belgia</option>
                      <option value="belize">Belize</option>
                      <option value="benin">Benin</option>
                      <option value="bhutan">Bhutan</option>
                      <option value="bolivia">Bolivia</option>
                      <option value="bosnia">Bosnia</option>
                      <option value="botswana">Botswana</option>
                      <option value="brazil">Brazil</option>
                      <option value="brunei">Brunei</option>
                      <option value="bulgaria">Bulgaria</option>
                      <option value="burkina faso">Burkina Faso</option>
                      <option value="burma">Burma</option>
                      <option value="burundi">Burundi</option>
                      <option value="cambodia">Cambodia</option>
                      <option value="cameroon">Cameroon</option>
                      <option value="canada">Canada</option>
                      <option value="cape verde">Cape Verde</option>
                      <option value="central african">Central African</option>
                      <option value="chadian">Chadian</option>
                      <option value="chilean">Chilean</option>
                      <option value="chinese">Chinese</option>
                      <option value="colombian">Colombian</option>
                      <option value="comoran">Comoran</option>
                      <option value="congolese">Congolese</option>
                      <option value="costa rican">Costa Rican</option>
                      <option value="croatian">Croatian</option>
                      <option value="cuban">Cuban</option>
                      <option value="cypriot">Cypriot</option>
                      <option value="czech">Czech</option>
                      <option value="danish">Danish</option>
                      <option value="djibouti">Djibouti</option>
                      <option value="dominican">Dominican</option>
                      <option value="dutch">Dutch</option>
                      <option value="east timorese">East Timorese</option>
                      <option value="ecuadorean">Ecuadorean</option>
                      <option value="egyptian">Egyptian</option>
                      <option value="emirian">Emirian</option>
                      <option value="england">England</option>
                      <option value="equatorial guinean">Equatorial Guinean</option>
                      <option value="eritrean">Eritrean</option>
                      <option value="estonian">Estonian</option>
                      <option value="ethiopian">Ethiopian</option>
                      <option value="fijian">Fijian</option>
                      <option value="filipino">Filipino</option>
                      <option value="finnish">Finnish</option>
                      <option value="french">French</option>
                      <option value="gabonese">Gabonese</option>
                      <option value="gambian">Gambian</option>
                      <option value="georgian">Georgian</option>
                      <option value="german">German</option>
                      <option value="ghanaian">Ghanaian</option>
                      <option value="greek">Greek</option>
                      <option value="grenadian">Grenadian</option>
                      <option value="guatemalan">Guatemalan</option>
                      <option value="guinea-bissauan">Guinea-Bissauan</option>
                      <option value="guinean">Guinean</option>
                      <option value="guyanese">Guyanese</option>
                      <option value="haitian">Haitian</option>
                      <option value="herzegovinian">Herzegovinian</option>
                      <option value="honduran">Honduran</option>
                      <option value="hungarian">Hungarian</option>
                      <option value="icelander">Icelander</option>
                      <option value="indian">Indian</option>
                      <option value="indonesian">Indonesian</option>
                      <option value="iranian">Iranian</option>
                      <option value="iraqi">Iraqi</option>
                      <option value="irish">Irish</option>
                      <option value="israeli">Israeli</option>
                      <option value="italian">Italian</option>
                      <option value="ivorian">Ivorian</option>
                      <option value="jamaican">Jamaican</option>
                      <option value="japanese">Japanese</option>
                      <option value="jordanian">Jordanian</option>
                      <option value="kazakhstani">Kazakhstani</option>
                      <option value="kenyan">Kenyan</option>
                      <option value="kittian and nevisian">Kittian and Nevisian</option>
                      <option value="kuwaiti">Kuwaiti</option>
                      <option value="kyrgyz">Kyrgyz</option>
                      <option value="laotian">Laotian</option>
                      <option value="latvian">Latvian</option>
                      <option value="lebanese">Lebanese</option>
                      <option value="liberian">Liberian</option>
                      <option value="libyan">Libyan</option>
                      <option value="liechtensteiner">Liechtensteiner</option>
                      <option value="lithuanian">Lithuanian</option>
                      <option value="luxembourger">Luxembourger</option>
                      <option value="macedonian">Macedonian</option>
                      <option value="malagasy">Malagasy</option>
                      <option value="malawian">Malawian</option>
                      <option value="malaysian">Malaysian</option>
                      <option value="maldivan">Maldivan</option>
                      <option value="malian">Malian</option>
                      <option value="maltese">Maltese</option>
                      <option value="marshallese">Marshallese</option>
                      <option value="mauritanian">Mauritanian</option>
                      <option value="mauritian">Mauritian</option>
                      <option value="mexican">Mexican</option>
                      <option value="micronesian">Micronesian</option>
                      <option value="moldovan">Moldovan</option>
                      <option value="monacan">Monacan</option>
                      <option value="mongolian">Mongolian</option>
                      <option value="moroccan">Moroccan</option>
                      <option value="mosotho">Mosotho</option>
                      <option value="motswana">Motswana</option>
                      <option value="mozambican">Mozambican</option>
                      <option value="namibian">Namibian</option>
                      <option value="nauruan">Nauruan</option>
                      <option value="nepalese">Nepalese</option>
                      <option value="new zealander">New Zealander</option>
                      <option value="ni-vanuatu">Ni-Vanuatu</option>
                      <option value="nicaraguan">Nicaraguan</option>
                      <option value="nigerien">Nigerien</option>
                      <option value="north korean">North Korean</option>
                      <option value="northern irish">Northern Irish</option>
                      <option value="norwegian">Norwegian</option>
                      <option value="omani">Omani</option>
                      <option value="pakistani">Pakistani</option>
                      <option value="palauan">Palauan</option>
                      <option value="panamanian">Panamanian</option>
                      <option value="papua new guinean">Papua New Guinean</option>
                      <option value="paraguayan">Paraguayan</option>
                      <option value="peruvian">Peruvian</option>
                      <option value="polish">Polish</option>
                      <option value="portuguese">Portuguese</option>
                      <option value="qatari">Qatari</option>
                      <option value="romanian">Romanian</option>
                      <option value="russian">Russian</option>
                      <option value="rwandan">Rwandan</option>
                      <option value="saint lucian">Saint Lucian</option>
                      <option value="salvadoran">Salvadoran</option>
                      <option value="samoan">Samoan</option>
                      <option value="san marinese">San Marinese</option>
                      <option value="sao tomean">Sao Tomean</option>
                      <option value="saudi">Saudi</option>
                      <option value="scottish">Scottish</option>
                      <option value="senegalese">Senegalese</option>
                      <option value="serbian">Serbian</option>
                      <option value="seychellois">Seychellois</option>
                      <option value="sierra leonean">Sierra Leonean</option>
                      <option value="singaporean">Singaporean</option>
                      <option value="slovakian">Slovakian</option>
                      <option value="slovenian">Slovenian</option>
                      <option value="solomon islander">Solomon Islander</option>
                      <option value="somali">Somali</option>
                      <option value="south african">South African</option>
                      <option value="south korean">South Korean</option>
                      <option value="spanish">Spanish</option>
                      <option value="sri lankan">Sri Lankan</option>
                      <option value="sudanese">Sudanese</option>
                      <option value="surinamer">Surinamer</option>
                      <option value="swazi">Swazi</option>
                      <option value="swedish">Swedish</option>
                      <option value="swiss">Swiss</option>
                      <option value="syrian">Syrian</option>
                      <option value="taiwanese">Taiwanese</option>
                      <option value="tajik">Tajik</option>
                      <option value="tanzanian">Tanzanian</option>
                      <option value="thai">Thai</option>
                      <option value="togolese">Togolese</option>
                      <option value="tongan">Tongan</option>
                      <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                      <option value="tunisian">Tunisian</option>
                      <option value="turkish">Turkish</option>
                      <option value="tuvaluan">Tuvaluan</option>
                      <option value="ugandan">Ugandan</option>
                      <option value="ukrainian">Ukrainian</option>
                      <option value="uruguayan">Uruguayan</option>
                      <option value="uzbekistani">Uzbekistani</option>
                      <option value="venezuelan">Venezuelan</option>
                      <option value="vietnamese">Vietnamese</option>
                      <option value="welsh">Welsh</option>
                      <option value="yemenite">Yemenite</option>
                      <option value="zambian">Zambian</option>
                      <option value="zimbabwean">Zimbabwean</option>
                    </select>
                  </div>
                  <div id="birthday-date" className="flex gap-8">
                    <label htmlFor="birthday" className="w-[130px] py-[2px]">Birthday Date</label>
                    <input className="bg-[#DED6C6]" type="date" id="birthday-select" value="2023-06-03"/>
                    <a href="#">Edit</a>
                  </div>
                  <button id="profile-save-button" type="submit" className="my-[50px] mt-[50px] border-none rounded-2xl px-[20px] shadow-[0px_8px_10px_#38291B] bg-yellow-700 text-orange-300 font-bold no-underline w-full h-10">Save</button>
                </form>
              </div>
              <div id="profile-user-picture">
                <div className="flex flex-col border-l-2 pl-[25px]">
                  <div>
                    <div className="flex items-center justify-center">
                      <div className="inline-block border-transparent rounded-full p-[2px] bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                        <img className="border-[3.38px] border-white object-cover w-[110px] h-[110px] rounded-full"
                          src={`http://localhost:8888/uploads/${profiles.picture}`} alt="profile"/>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button id="profile-choose-photo-button" type="submit" className="mt-[50px] border-none rounded-2xl px-[20px] shadow-[0px_8px_10px_#38291B] bg-yellow-700 text-orange-300 font-bold no-underline w-full h-10">Choose Photo</button>
                  </div>
                  <div className="mt-[50px]">
                    <ul>
                      <li>Image size: max, 2 MB</li>
                      <li>Image formats: .JPG, .JPEG, .PNG</li>
                    </ul>
                  </div>
                </div>
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
        <div className="text-9xl">Profile</div>
        <div>{profiles?.fullName}</div>
        <div>{profiles?.email}</div>
        <Link className="btn btn-primary" to="/">Go to Home</Link>
      </div> */}
    </>
  )
}
export default Profile;