import { useState, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../components/Loader"
import { setCredentials } from "../../redux/Features/Auth/authSlice"
import { toast } from "react-toastify"
import { useRegisterMutation } from '../../redux/Api/usersApiSlice.js'

const Register =()=>{
  const [username, setUserName]=useState("")
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  const [confirmPassword, setConfirmPassword]=useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, {isLoading}]= useRegisterMutation()
  const {userInfo} = useSelector(state => state.auth)
  
  const search = useLocation()
  const sp =  new URLSearchParams(search)
  const redirect = sp.get('redirect') || '/'
  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate, redirect , userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    console.log("Sending data to API:", { username, email, password });
  
    try {
      const res = await register({ username, email, password }).unwrap();
      console.log("Server response:", res);
      dispatch(setCredentials({ ...res }));
      toast.success("User successfully created");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error?.data?.message || "Registration failed");
    }
  };
  
  return <section className="pl-[5rem] pr-0 flex flex-wrap w-[100%]">
      <div className="mr-[10rem] mt-[5rem]" style={{marginLeft: "8rem"}}>
        <h1 className="text-2l font-semibold mb-4">Register</h1>
        <form onSubmit={ submitHandler } className="container w-[40rem]">
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
            <input type="text" id="name" className="border-t-0 border-b-4 border-r-0 border-l-0 focus:border-blue-200 mt-1 p-2 rounded-lg border-rounded w-[150%] text-gray-400 bg-black font-[1.2rem] " 
            placeholder="Enter name" value={username} onChange={e=>setUserName(e.target.value)}/>

          </div>
          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
            <input type="email" id="email" className="border-t-0 border-b-4 border-r-0 border-l-0 focus:border-blue-200 mt-1 p-2 rounded-lg border-rounded w-[150%]  text-gray-400 bg-black font-[1.2rem]" 
            placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)}/>

          </div>
          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
            <input type="password" id="password" className="border-t-0 border-b-4 border-r-0 border-l-0 focus:border-blue-200 mt-1 rounded-lg p-2 border-rounded w-[150%]  text-gray-400 bg-black font-[1.2rem]" 
            placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)}/>

          </div>
          <div className="my-[2rem]">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">Confirm password</label>
            <input type="password" id="confirmPassword" className="border-t-0 border-b-4 border-r-0 border-l-0 focus:border-blue-200 mt-1 rounded-lg p-2 border-rounded w-[150%]  text-gray-400 bg-black font-[1.2rem]" 
            placeholder="Enter confirm password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>

          </div>

          <button disabled={isLoading}
          type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-lg border-t-0 cursor-pointer my-[1rem]">
            { isLoading ? "Loading..." : "Register" }
          </button>
          
          {isLoading && <Loader />}

        </form>

        <div className="mt-4">
          <p className="text-white">
            Arleady have an account ? {""}
            <Link to={ redirect? `/login?redirect=${redirect}`:"/login"} className="text-pink-600">Login</Link>
          </p>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        style={{right: "0"}}
        className="w-[51%] mt-10 ml-[10rem] rounded-lg"
      />
  </section>
}

export default Register