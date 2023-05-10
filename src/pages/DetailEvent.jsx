import React from "react";
import { useParams } from "react-router-dom";
import http from "../helpers/http";

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
    <div className="flex justify-center flex-col h-screen items-center text-5xl">
      <div>{event?.event}</div>
      <div>{event?.location}</div>
    </div>
  )
}
export default Details;