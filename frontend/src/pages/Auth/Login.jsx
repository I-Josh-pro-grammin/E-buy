import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/Api/usersApiSlice.js";
import { setCredentials } from "../../redux/Features/Auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res)
      dispatch(setCredentials({ ...res }));
      navigate(redirect); // Ensure navigation after successful login
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div>
      <section style={{ paddingLeft: "10rem", display: "flex", flexWrap: "wrap", backgroundColor: "rgb(29, 29, 29)", height: "150%",width:"100%" }}>
        <div style={{ width:"40%", marginTop: "5rem" }}>
          <h1 style={{ font: "bold", fontSize: "2xl", marginBottom: "4" }}>Sign In</h1>
          <form onSubmit={submitHandler} className="container" style={{ width: "40rem" }}>
            <div style={{ marginTop: "2rem", marginBottom: "2rem", color: "aliceblue" }}>
              <label htmlFor="email" style={{ display: "block", fontSize: "medium", color: "aliceblue" }}>Email Address</label>
              <input
                type="email"
                id="email"
                className="email focus:border-black focus:border-4"
                style={{ marginTop: 1, padding: 5, borderTop: "0", borderLeft: "0", borderRight: "0", borderRadius: 3, width: "28rem", color: "white", backgroundColor: "rgb(29, 29, 29)", height: "2.5rem", fontSize: "1.2rem" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "2rem", marginBottom: "2rem", color: "aliceblue" }}>
              <label htmlFor="password" style={{ display: "block", fontSize: "medium", color: "aliceblue" }}>Password</label>
              <input
                type="password"
                id="password"
                className="password focus:border-black focus:border-4"
                style={{ marginTop: 1, padding: 5, borderTop: "0", borderLeft: "0", borderRight: "0", borderRadius: 3, width: "28rem", color: "white", backgroundColor: "rgb(29, 29, 29)", height: "2.5rem", fontSize: "1.2rem" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-600"
              style={{padding: "0.4rem 1rem", borderRadius: 5, cursor: "pointer", margin: "1rem" }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
            {isLoading && <Loader />}
          </form>
          <div style={{ marginTop: 4 }}>
            <p className="text-white">New Customer?{" "}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-pink-600" style={{":hover": { textDecoration: "underline" } }}>Register</Link>
            </p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt="normal register image"
          className="w-[54%] mt-10 h-[150%] rounded-lg"
        />

      </section>
    </div>
  );
};

export default Login;