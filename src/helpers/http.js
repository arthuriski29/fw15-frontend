import axios from "axios";

const http = (token) => {
  const headers = {}
    if(token){
      headers.Authorization = `Bearer ${token}`
    }
    return axios.create({
      headers
    })
  
}
export default http