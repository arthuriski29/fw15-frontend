import React from "react"
import { useSelector } from "react-redux"
import http from "../helpers/http"

// function History() {
//   const {histories, setHistories} = React.useState([])
//   const token = useSelector(state => state.auth.token)
  
//   React.useEffect(() => {
//     const getHistoryData = async () => {
//       const {data} = await http(token).get("/history")
//       setHistories(data.results)
//     }
//     getHistoryData()
//   },[])
//   return (
//     <>
//       <div>
//         {histories.map(history => (
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

function History() {
  const [histories, setHistories] = React.useState([])
  const token = useSelector(state => state.auth.token)
  React.useEffect(() => {
    const getHistoryData = async () => {
      const {data} = await http(token).get("/history")
      setHistories(data.results)
    }
    getHistoryData()
  },[])
  return (
    <>
      <div>
        {histories.map(history => (
          <div key={`history-list-${history.id}`}>
            <div>{history.title}</div>
            <div>{history.location}</div>
            <div>{history.date}</div>
            <div>Detail</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default History
