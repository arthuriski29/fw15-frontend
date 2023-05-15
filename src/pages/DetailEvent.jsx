import React from "react"
import { useParams } from "react-router-dom"
import http from "../helpers/http"

const Details = () => {
  const {id} = useParams()
  const [event, setEvent] = React.useState({})
  React.useEffect(() => {
    const getEventData = async() => {
      const {data} = await http().get(`/events/${id}`, )
      setEvent(data.results)
    }
    if(id){
      getEventData(id)
    }
  }, [id])
  
  return(
    <>
      {/* <main>
        <aside className="ml-[70px] mt-[50px] font-semibold text-sm leading-5">
          <div className="flex gap-[15px]">
            <div>
              <div
                className="inline-block p-[2px] border-transparent rounded-full p-[2px] bg-gradient-to-r from-[#3366FF] to-[#884DFF]">
                <img className="border-[3.38px] border-white object-cover w-11 h-11 rounded-full"
                  src="assets/profile-picture-1.jpg" alt="profile">
              </div>
            </div>

            <div>
              <div>Jhon Tomson</div>
              <div className="font-normal text-xs leading-4 text-[#666971]">Entrepreneur, ID</div>
            </div>
          </div>


          <ul className="mt-14 flex flex-col gap-8">
            <li className="flex gap-[26.5px]"><i data-feather="user"></i>Profile</li>
            <ul className="ml-12 flex flex-col gap-8">
              <li className="flex gap-[26.5px]" id="strikethrough"><i data-feather="credit-card"></i>Card</li>
              <li className="flex gap-[26.5px] text-[#FFBA7B]"><i data-feather="edit-3"></i>Edit Profile</li>
              <li className="flex gap-[26.5px]"><i data-feather="unlock"></i>Change Password</li>
            </ul>
            <li className="flex gap-[26.5px]"><i data-feather="check-square"></i>My Booking</li>
            <li className="flex gap-[26.5px]"><i data-feather="heart"></i>My Wishlist</li>
            <li className="flex gap-[26.5px]"><i data-feather="settings"></i>Settings</li>
            <li className="flex gap-[26.5px] text-[#F03800]"><i data-feather="log-out"></i>Logout</li>
          </ul>
        </aside>
        <div className="flex my-12 flex-1 ml-[50px] mr-[50px]">
          <div className="bg-[#F5F5F5] px-12 py-11 rounded-2xl flex-1 flex flex-col">
            <div className="flex justify-between">
              <div className="font-semibold text-xl leading-6">Manage Event</div>
              <div className="font-semibold text-xl leading-6">
                <a href="create-event.html" className="underline underline-offset-8 text-[#AA7C52]">Create </a>
              </div>
            </div>
          
            <div className="flex flex-1 justify-center items-center">
              <div className="w-[315px] h-[113px] flex flex-col text-center">
                <span className="font-semibold text-2xl tracking-wider">No ticket bought</span>
                <span className="font-normal text-[#666971] leading-8 text-sm ">It appears you haven’t bought any tickets yet. Maybe try searching these?</span>
              </div>
            </div>      
          </div>
        </div>
      </main> */}
      <div className="flex justify-center flex-col h-screen items-center text-5xl">
        <div>{event?.event}</div>
        <div>{event?.location}</div>
      </div>
    </>
    
  )
}
export default Details
