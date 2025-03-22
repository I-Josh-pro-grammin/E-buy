import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import { setCredentials } from "../../redux/Features/Auth/authSlice"
import { Link } from "react-router-dom"
import { useProfileMutation } from "../../redux/Api/usersApiSlice"

const Profile = () => {
  const [username, setUserName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState("")
  const [confirmPassword, setConfirmPassword]=useState("")
   
  const {userInfo}=useSelector(state=>state.auth)
  const [updateProfile, {isLoading: loadingUpdateProfile}]= useProfileMutation()
 
  useEffect(()=>{
    setUserName(userInfo.username)
    setEmail(userInfo.email)
},[userInfo.email,  userInfo.username])

  const dispatch = useDispatch()

  const submitHandler = async (e)=>{
    e.preventDefault()

    if(userInfo.password !== userInfo.confirmPassword){
      toast.error("Passwords do not match")
    }else{
      try {
        const res = await updateProfile({_id: userInfo._id, username, email, password}).unwrap()
        dispatch(setCredentials({...res}))
        toast.success("User profile updated successfully")
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  return (
    <div className="container mx-auto p-4 mr-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4 mt-20">
        <div className="md:w-1/3">
          <h1 className="text-xl font-bold mb-7">Update Profile</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-white mb-2">Name</label>
              <input type="text" className="form-input p-2 bg-gray-400 rounded-sm w-full" value={username}  placeholder="Enter name" onChange={e=>setUserName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Email</label>
              <input type="email" className="form-input p-2 bg-gray-400 rounded-sm w-full" value={email}  placeholder="Enter email" onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Change password</label>
              <input type="password" className="form-input p-2 bg-gray-400 rounded-sm w-full" value={password}  placeholder="Enter new password" onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Confirm new password</label>
              <input type="password" className="form-input p-2 bg-gray-400 rounded-sm w-full" value={confirmPassword}  placeholder="Confirm password" onChange={e=>setConfirmPassword(e.target.value)} />
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Update</button>
              <Link to="/order-list" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">My Orders</Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  )
}

export default Profile