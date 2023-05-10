import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  const [token, setToken] = React.useState('')
  const [initToken, setInitToken] = React.useState(false)
  React.useEffect(()=>{

    if(window.localStorage.getItem('token')){
      setToken(window.localStorage.getItem('token'))
      setInitToken(window.localStorage.getItem('token'))
    }
    setInitToken(true)
  }, [])

  React.useEffect(()=>{
    if(initToken){
      if(!token){
        navigate('/login', {state: {warningMessage: 'You have to login first'}})
      }
    }
  }, [token, initToken, navigate])

  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen">
        <div className="text-9xl">Profile</div>
        <Link className="btn btn-primary" to="/">Go to Home</Link>
      </div>
    </>
  )

}

export default Profile;