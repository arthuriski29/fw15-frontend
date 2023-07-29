import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Formik, Field } from "formik"
import moment from "moment"
import http from "../helpers/http"


import { logout as logoutAction} from "../redux/reducers/auth" 

//IMAGES
import weTick from "../assets/images/wetick-logo.png"
import fbGrey from "../assets/images/fb-grey.svg"
import whatsappGrey from "../assets/images/whatsapp-grey.svg"
import igGrey from "../assets/images/ig-grey.svg"
import twitterGrey from "../assets/images/twitter-grey.svg"
import defaultProfile from "../assets/images/default-profile.jpg"

//ICONS
import { FiAlignJustify } from "react-icons/fi"
import { FiUser } from "react-icons/fi"
import { FiCreditCard } from "react-icons/fi"
import { FiEdit3 } from "react-icons/fi"
import { FiCheckSquare } from "react-icons/fi"
import { FiHeart } from "react-icons/fi"
import { FiSettings } from "react-icons/fi"
import { FiLogOut } from "react-icons/fi"
import { FiUnlock } from "react-icons/fi"
import {AiOutlineLoading3Quarters} from "react-icons/ai"


const Profile = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const [profiles, setProfile] = React.useState({})
  const [editUsername, setEditUsername] = React.useState(false)
  const [editEmail, setEditEmail] = React.useState(false)
  const [editPhoneNumber, setEditPhoneNumber] = React.useState(false)
  const [editBirthDate, setEditBirthDate] = React.useState(false)
  const [selectedPicture, setSelectedPicture] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [pictureURI, setPictureURI] = React.useState("")


  
  
  React.useEffect(()=>{
    async function getProfileData(){
      const {data} = await http(token).get("/profile")
      setProfile(data.results)
    }  
    getProfileData()
  }, [])

  React.useEffect(()=>{
    console.log(selectedPicture)
  }, [selectedPicture])

  const fileToDataUrl = (file) => {
    const reader = new FileReader()
    reader.addEventListener("load", ()=> {
      setPictureURI(reader.result)
    })
    reader.readAsDataURL (file)
  }

  const changePicture = (e)=> {
    const file = e.target.files[0]
    setSelectedPicture(file)
    fileToDataUrl(file)
  }

  const editProfile = async (values) => {
    setOpenModal(true)
    const form = new FormData()
    Object.keys(values).forEach((key)=>{
      if(values[key]){
        if(key === "birthDate"){
          form.append(key, moment(values[key], "DD-MM-YYYY").format("YYYY/MM/DD"))
        }else{
          form.append(key, values[key])
        }
      }
    })
    if(selectedPicture){
      form.append("picture", selectedPicture)
    }
    const {data} = await http(token).patch("/profile", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    setProfile(data.results)
    setEditBirthDate(false)
    setEditEmail(false)
    setEditPhoneNumber(false)
    setEditUsername(false)
    setSelectedPicture(false)
    setOpenModal(false)
  }

  const doLogout = ()=> {
    dispatch(logoutAction())

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
      <main className="flex">
        <aside className="ml-[70px] mt-[50px] font-semibold text-sm leading-5">
          <div className="flex gap-[15px]">
            <div>
              <div
                className="inline-block border-transparent rounded-full p-[2px] bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                {profiles.picture && <img className="border-[3.38px] border-white object-cover w-11 h-11 rounded-full"
                  src={profiles.picture.startsWith("https")? profiles.picture : `http://localhost:8888/uploads/${profiles.picture}`} alt={profiles?.picture}/>}
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
            <Formik
              initialValues = {{
                fullName: profiles?.fullName,
                username: profiles?.username,
                email: profiles?.email,
                phoneNumber: profiles?.phoneNumber,
                gender: profiles?.gender ? "1" : "0",
                profession: profiles?.profession,
                nationality: profiles?.nationality,
                birthDate: profiles?.birthDate && moment(profiles?.birthDate).format("YYYY-MM-DD")
              }}
              onSubmit = {editProfile}
              enableReinitialize = {true}
            >
              {({handleSubmit, handleChange, handleBlur, values}) => (
                <form onSubmit={handleSubmit} className="flex gap-[50px] font-normal text-sm leading-5">
                  <div id="profile-list" className="flex flex-col w-[468px]">
                    <div className="w-full flex flex-col gap-[50px]">
                      <div id="name" className="flex gap-8">
                        <label htmlFor="name" className="w-[130px] py-[5px]">Name</label>
                        <div className="w-full h-[30px] rounded-[12.5px] pl-[10px] bg-[#fff] py-[3px] flex-1">
                          <input name="fullName" onChange={handleChange} onBlur={handleBlur} value={values?.fullName} type="text" id="name-input" placeholder={profiles?.fullName}/>
                        </div>
                      </div>
                      <div id="username" className="flex gap-8">
                        <label htmlFor="username" className="w-[130px] py-[5px]">Username</label>
                        <div className="w-full h-[30px] pl-[10px] py-[3px] flex flex-1 gap-5">
                          
                          {!editUsername && <span>{profiles?.username === null ? <span className="text-secondary">Not Set</span>: profiles?.username}</span>}
                          {editUsername && <input className="bg-[#fff] rounded-[12.5px]" name="username" onChange={handleChange} onBlur={handleBlur} value={values?.username} type="text" id="username-input" placeholder={`@${profiles?.username}`.toLowerCase()} /> }
                          
                          {!editUsername && <div>
                            <button onClick={() => setEditUsername(true)} type="button" className="text-accent hover:text-secondary font-bold">Edit</button>
                          </div>}
                        </div>
                      </div>
                      <div id="email" className="flex gap-8">
                        <label htmlFor="email" className="w-[130px] py-[5px]">Email</label>
                        <div className="w-full h-[30px] pl-[10px] py-[3px] flex flex-1 gap-5">
                          <div>
                            {!editEmail && <span>{profiles?.email === null ? <span className="text-secondary">Not Set</span>: profiles?.email}</span>}
                            {editEmail && <input className="bg-[#fff] rounded-[12.5px]" name="email" onChange={handleChange} onBlur={handleBlur} value={values?.email} type="text" id="email-input" placeholder={`${profiles?.email}`.toLowerCase()} /> }
                          </div>
                          <div>
                            <button onClick={() => setEditEmail(true)} type="button" className="text-accent hover:text-secondary font-bold">Edit</button>
                          </div>
                        </div>
                      </div>
                      <div id="phoneNumber" className="flex gap-8">
                        <label htmlFor="phoneNumber" className="w-[130px] py-[5px]">PhoneNumber</label>
                        <div className="w-full h-[30px] pl-[10px] py-[3px] flex flex-1 gap-5">
                          <div>
                            {!editPhoneNumber && <span>{profiles?.phoneNumber === null ? <span className="text-secondary">Not Set</span>: profiles?.phoneNumber}</span>}
                            {editPhoneNumber && <input className="bg-[#fff] rounded-[12.5px]" name="phoneNumber" onChange={handleChange} onBlur={handleBlur} value={values?.phoneNumber} type="text" id="phone-input" placeholder={`@${profiles?.phoneNumber}`.toLowerCase()} /> }
                          </div>
                          
                          <div>
                            <button onClick={() => setEditPhoneNumber(true)} type="button" className="text-accent hover:text-secondary font-bold">Edit</button>
                          </div>
                        </div>
                      </div>
                      <div id="gender" className="flex gap-8">
                        <div htmlFor="gender" className="w-[130px] py-[2px]">Gender</div>
                        <label className="flex gap-2 items-center">
                          <Field type="radio" name="gender" id="gender-male" className="radio radio-accent" value="0"/>
                          <span>Male</span>
                        </label>
                        <label className="flex gap-2 items-center">
                          <Field type="radio" name="gender" id="gender-female" className="radio radio-accent" value="1"/>
                          <span>Female</span>
                        </label>
                      </div>
                      <div id="profession" className="flex gap-8">
                        <label htmlFor="profession" className="w-[130px] py-[2px]">Profession</label>
                        <select className="w-[213px]" name="profession" value={values?.profession} onChange={handleChange} onBlur={handleBlur} id="profession-select">
                          <option value= "" disabled selected>Select Profession</option>
                          <option value="Entrepreneur">Entrepreneur</option>
                          <option value="Artist">Artist</option>
                          <option value="Business Analyst">Business Analyst</option>
                          <option value="Construction Worker">Construction Worker</option>
                          <option value="Designer">Designer</option>
                          <option value="Entrepreneur">Entrepreneur</option>
                          <option value="Freelancer">Freelancer</option>
                          <option value="Social Worker">Social Worker</option>
                          <option value="Elite Wrestler">Elite Wrestler</option>
                          <option value="Football Player">Football Player</option>
                        </select>
                      </div>
                      <div id="nationality" className="flex gap-8">
                        <label htmlFor="nationality" className="w-[130px] py-[2px]" >Nationality</label>
                        <select id="nationality-select" name="nationality" value={values?.nationality} onChange={handleChange} onBlur={handleBlur}>
                          <option value="" disabled selected>Select Country</option>
                          <option value="afghanistan">Afghanistan</option>
                          <option value="albania">Albania</option>
                          <option value="algeria">Algeria</option>
                          <option value="andorra">Andorra</option>
                          <option value="angola">Angola</option>
                          <option value="antigua">Antigua</option>
                          <option value="argentina">Argentina</option>
                          <option value="armenia">Armenian</option>
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
                          <option value="chad">Chad</option>
                          <option value="chile">Chile</option>
                          <option value="china">China</option>
                          <option value="colombia">Colombia</option>
                          <option value="comoros">Comoros</option>
                          <option value="congo">Congo</option>
                          <option value="costa rica">Costa Rica</option>
                          <option value="croatia">Croatia</option>
                          <option value="cuba">Cuba</option>
                          <option value="cyprus">Cyprus</option>
                          <option value="czech">Czech</option>
                          <option value="denmark">Denmark</option>
                          <option value="djibouti">Djibouti</option>
                          <option value="dominica">Dominica</option>
                          <option value="ecuador">Ecuador</option>
                          <option value="egypt">Egypt</option>
                          <option value="el salvador">El Salvador</option>
                          <option value="equatorial guinea">Equatorial Guinea</option>
                          <option value="eritrea">Eritrea</option>
                          <option value="estonia">Estonia</option>
                          <option value="eswatini">Eswatini</option>
                          <option value="ethiopia">Ethiopia</option>
                          <option value="fiji">Fiji</option>
                          <option value="finland">Finland</option>
                          <option value="france">France</option>
                          <option value="gabon">Gabon</option>
                          <option value="gambia">Gambia</option>
                          <option value="georgia">Georgia</option>
                          <option value="germany">Germany</option>
                          <option value="ghana">Ghana</option>
                          <option value="greece">Greece</option>
                          <option value="grenada">Grenada</option>
                          <option value="guatemala">Guatemala</option>
                          <option value="guinea-bissau">Guinea-Bissau</option>
                          <option value="guinea">Guinea</option>
                          <option value="guyana">Guyana</option>
                          <option value="haiti">Haiti</option>
                          <option value="herzegovina">Herzegovina</option>
                          <option value="honduras">Honduras</option>
                          <option value="hungary">Hungary</option>
                          <option value="iceland">Iceland</option>
                          <option value="india">India</option>
                          <option value="indonesia">Indonesia</option>
                          <option value="iran">Iran</option>
                          <option value="iraq">Iraq</option>
                          <option value="ireland">Ireland</option>
                          <option value="israel">Israel</option>
                          <option value="italyn">Italy</option>
                          <option value="ivory coast">Ivory Coast</option>
                          <option value="jamaica">Jamaica</option>
                          <option value="japan">Japan</option>
                          <option value="jordan">Jordan</option>
                          <option value="kazakhstan">Kazakhstan</option>
                          <option value="kenya">Kenya</option>
                          <option value="kuwait">Kuwait</option>
                          <option value="kyrgyztan">Kyrgyztan</option>
                          <option value="laos">Laos</option>
                          <option value="latvia">Latvia</option>
                          <option value="lebanon">Lebanon</option>
                          <option value="lesotho">Lesotho</option>
                          <option value="liberia">Liberia</option>
                          <option value="libya">Libya</option>
                          <option value="liechtenstein">Liechtenstein</option>
                          <option value="lithuania">Lithuania</option>
                          <option value="luxembourg">Luxembourg</option>
                          <option value="macedonia">Macedonia</option>
                          <option value="madagascar">Madagascar</option>
                          <option value="malawi">Malawi</option>
                          <option value="malaysia">Malaysia</option>
                          <option value="maldives">Maldives</option>
                          <option value="mali">Mali</option>
                          <option value="malta">Malta</option>
                          <option value="marshall islands">Marshall Islands</option>
                          <option value="mauritania">Mauritania</option>
                          <option value="mauritius">Mauritius</option>
                          <option value="mexico">Mexico</option>
                          <option value="micronesia">Micronesia</option>
                          <option value="moldova">Moldova</option>
                          <option value="monaco">Monaco</option>
                          <option value="mongolia">Mongolia</option>
                          <option value="morocco">Morocco</option>
                          <option value="mozambique">Mozambique</option>
                          <option value="namibia">Namibia</option>
                          <option value="nauru">Nauru</option>
                          <option value="nepal">Nepal</option>
                          <option value="netherlands">Netherlands</option>
                          <option value="new zealand">New Zealand</option>
                          <option value="nicaragua">Nicaragua</option>
                          <option value="nigeria">Nigeria</option>
                          <option value="north korea">North Korea</option>
                          <option value="northern ireland">Northern Ireland</option>
                          <option value="norwegia">Norwegia</option>
                          <option value="oman">Oman</option>
                          <option value="pakistan">Pakistan</option>
                          <option value="palau">Palau</option>
                          <option value="panama">Panama</option>
                          <option value="papua new guinea">Papua New Guinea</option>
                          <option value="paraguay">Paraguay</option>
                          <option value="peru">Peru</option>
                          <option value="phillipines">Phillipines</option>
                          <option value="poland">Poland</option>
                          <option value="portugal">Portugal</option>
                          <option value="qatar">Qatar</option>
                          <option value="romania">Romania</option>
                          <option value="russia">Russia</option>
                          <option value="rwanda">Rwanda</option>
                          <option value="saint kitts and nevis">Saint Kitts and Nevis</option>
                          <option value="saint lucia">Saint Lucia</option>
                          <option value="samoa">Samoa</option>
                          <option value="san marino">San Marino</option>
                          <option value="sao tome and principe">Sao Tome and Principe</option>
                          <option value="saudi arabia">Saudi Arabia</option>
                          <option value="scotland">Scotland</option>
                          <option value="senegal">Senegal</option>
                          <option value="serbia">Serbia</option>
                          <option value="seychelles">Seychelles</option>
                          <option value="sierra leone">Sierra Leone</option>
                          <option value="singapore">Singapore</option>
                          <option value="slovakia">Slovakia</option>
                          <option value="slovenia">Slovenia</option>
                          <option value="solomon island">Solomon Island</option>
                          <option value="somalia">Somalia</option>
                          <option value="south africa">South Africa</option>
                          <option value="south korea">South Korea</option>
                          <option value="spain">Spain</option>
                          <option value="sri lanka">Sri Lanka</option>
                          <option value="sudan">Sudan</option>
                          <option value="suriname">Suriname</option>
                          <option value="sweden">Sweden</option>
                          <option value="swiss">Swiss</option>
                          <option value="syria">Syria</option>
                          <option value="taiwan">Taiwan</option>
                          <option value="tajikistan">Tajikistan</option>
                          <option value="tanzania">Tanzania</option>
                          <option value="thailand">Thailand</option>
                          <option value="timor leste">Timor Leste</option>
                          <option value="togo">Togo</option>
                          <option value="tonga">Tonga</option>
                          <option value="trinidad and tobago">Trinidad and Tobago</option>
                          <option value="tunisia">Tunisia</option>
                          <option value="turkey">Turkey</option>
                          <option value="tuvalu">Tuvalu</option>
                          <option value="uganda">Uganda</option>
                          <option value="ukraine">Ukraine</option>
                          <option value="united arab emirates">United Arab Emirates</option>
                          <option value="united kingdom">United Kingdom</option>
                          <option value="united states">United States</option>
                          <option value="uruguay">Uruguay</option>
                          <option value="uzbekistan">Uzbekistan</option>
                          <option value="vanuatu">Vanuatu</option>
                          <option value="venezuela">Venezuela</option>
                          <option value="vietnam">Vietnam</option>
                          <option value="wales">Wales</option>
                          <option value="yemen">Yemen</option>
                          <option value="zambia">Zambia</option>
                          <option value="zimbabwe">Zimbabwe</option>
                        </select>
                      </div>
                      <div id="birthDate" className="flex gap-8">
                        <label htmlFor="birthDate" className="w-[130px] py-[5px]">Birth Date</label>
                        <div className="w-full h-[30px] pl-[10px] py-[3px] flex flex-1 gap-5">
                          <div>
                            {!editBirthDate && <span>{profiles?.birthDate === null ? <span className="text-secondary">Not Set</span>: moment(profiles?.birthDate).format("DD / MM / YYYY")}</span>}
                            {editBirthDate && <input className="bg-[#fff] rounded-[12.5px]" name="birthDate" onChange={handleChange} onBlur={handleBlur} value={values?.birthDate} type="date" id="birthday-select" /> }
                          </div>
                          <div>
                            <button onClick={() => setEditBirthDate(true)} type="button" className="text-accent hover:text-secondary font-bold">Edit</button>
                          </div>
                        </div>
                      </div>
                      {/* <div id="birthday-date" className="flex gap-8">
                        <label htmlFor="birthday" className="w-[130px] py-[2px]">Birthday Date</label>
                        <input className="bg-[#DED6C6]" type="date" id="birthday-select" value="2023-06-03"/>
                        <button className="butn btn-accent">Edit</button>
                      </div> */}
                      <button id="profile-save-button" type="submit" className="my-[50px] mt-[50px] border-none rounded-2xl px-[20px] shadow-[0px_8px_10px_#38291B] bg-yellow-700 text-orange-300 font-bold no-underline w-full h-10">Save</button>
                    </div>
                  </div>
                  <div id="profile-user-picture">
                    <div className="flex flex-col border-l-2 pl-[25px]">
                      <div>
                        <div className="flex items-center justify-center">
                          <div className="inline-block border-transparent rounded-full p-[2px] bg-gradient-to-r from-[#9E91AE] to-[#450206]">
                            {
                              !selectedPicture && <img className="border-[3.38px] border-white object-cover w-[110px] h-[110px] rounded-full"
                                src={
                                  profiles?.picture?.startsWith("https")? 
                                    profiles?.picture : (
                                      profiles?.picture === null ? 
                                        defaultProfile :
                                        `http://localhost:8888/uploads/${profiles?.picture}`
                                    )
                                } 
                                alt={profiles?.picture}/>
                            }
                            {
                              selectedPicture && 
                              <div className="w-full h-full relative">
                                <img className="border-[3.38px] border-white object-cover w-[110px] h-[110px] rounded-full" src={pictureURI} alt={profiles?.picture}/>
                                <div className="absolute top-0 left-0 bg-[#A87B51] opacity-50 w-full h-full rounded-full text-white flex justify-center items-center">File Selected</div>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                      <div>
                        {/* <button id="profile-choose-photo-button" type="submit" className="mt-[50px] border-none rounded-2xl px-[20px] shadow-[0px_8px_10px_#38291B] bg-yellow-700 text-orange-300 font-bold no-underline w-full h-10">Choose Photo</button> */}
                        <label className="btn btn-accent mt-[50px] border-none rounded-2xl px-[20px] shadow-[0px_8px_10px_#38291B] bg-yellow-700 text-orange-300 font-bold no-underline w-full h-8">
                          <span>Choose Photo</span>
                          <input type="file" name="picture" onChange={changePicture} className="hidden"/>
                        </label>
                      </div>
                      <div className="mt-[50px]">
                        <ul>
                          <li>Image size: max, 2 MB</li>
                          <li>Image formats: .JPG, .JPEG, .PNG</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
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
      <div>
        <input type="checkbox" id="loading" className="modal-toggle" checked={openModal}/>
        <div className="modal">
          <div className="modal-box bg-transparent shadow-none">
            <div className="flex justify-center items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin text-primary" size={25} />
              <div className="font-extrabold text-brown-400">Uploading Data...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Profile
