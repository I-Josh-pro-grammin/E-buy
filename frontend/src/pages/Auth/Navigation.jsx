import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHome, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import './Navigation.css'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/Api/usersApiSlice'
import { logout } from '../../redux/Features/Auth/authSlice'

const Navigation = () => {
  const { userInfo } = useSelector(state => state.auth)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  
  const closeSidebar = () => {
    setShowSidebar(false)
  }

   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [logoutApiCall] = useLogoutMutation()
  
   const logoutHandler = async () => {
     try {
       await logoutApiCall().unwrap();
       dispatch(logout())
       navigate('/login')
     } catch (error) {
       console.error(error)
     }
   }

   return (
<div className={`${showSidebar ? "hidden" : "flex"} mt-0 xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-9 bg-black text-white w-[3.2%] hover:w-[15%] h-[100vh] fixed`}
    id="navigation-container">
      <div className="flex flex-col justify-center space-y-2">
           <Link to='/' className='nav-item-link flex items-center transition-transform transform hover:translate-x-2'>
             <AiOutlineHome className="nav-item-icon mr-4 mt-[3rem]" size={24} />
             <span className="nav-item-name mt-[3rem]">HOME</span>
           </Link>
           <Link to='/shopping' className='nav-item-link flex items-center transition-transform transform hover:translate-x-2'>
             <AiOutlineShopping className="nav-item-icon mr-4 mt-[3rem]" size={24} />
             <span className="nav-item-name mt-[3rem]">SHOP</span>
           </Link>
           <Link to='/cart' className='nav-item-link flex items-center transition-transform transform hover:translate-x-2'>
             <AiOutlineShoppingCart className="nav-item-icon mr-4 mt-[3rem]" size={24} />
             <span className="nav-item-name mt-[3rem]">CART</span>
           </Link>
           <Link to='/favorite' className='nav-item-link flex items-center transition-transform transform hover:translate-x-2'>
             <FaHeart className="nav-item-icon mr-4 mt-[3rem]" size={24} />
             <span className="nav-item-name mt-[3rem]">FAVORITE</span>
           </Link>
           {/* Add more navigation items here */}
         </div>
         <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full'>
            <button onClick={toggleDropdown} className='drop-down-button flex items-center text-gray-8000 focus:outline-none'>
              {userInfo ? <span className="user-info text-white">{userInfo.username}</span> : <></>}
              {userInfo && (
                <svg 
                xmlns="http://www.w3.org/2000/svg"
                className={`w-4 h-4 ml-1 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }` }
                fill='none'
                viewBox='0 0 24 24'
                stroke="white"
                >
                    <path 
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth="2"
                      d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                </svg>
              )}
            </button>
            {dropdownOpen && userInfo && (
              <ul className={`absolute right-0 mr-4 mt-2 space-y-2 bg-gray text-gray-600 ${
                !userInfo.isAdmin ? "-top-20" : "-top-80"
              }`}>
                {userInfo.isAdmin &&  (
                  <>
                     <li>
                      <Link to="/admin/dashboard" className='block px-4 py-2 mt-0 hover:bg-gray-100'>Dashboard</Link>
                     </li>
                     <li>
                      <Link to="/admin/productlist" className='block px-4 py-2 mt-0 hover:bg-gray-100'>Products</Link>
                     </li>
                     <li>
                      <Link to="/admin/categorylist" className='block px-4 py-2 mt-0 hover:bg-gray-100'>Category</Link>
                     </li>
                     <li>
                      <Link to="/admin/orderlist" className='block px-4 py-2 mt-0 hover:bg-gray-100'>Orders</Link>
                     </li>
                     <li>
                      <Link to="/admin/userlist" className='block px-4 py-2 mt-0 hover:bg-gray-100'>Users</Link>
                     </li>
                     
                  </>
                )}

                <li>
                      <Link to="/profile" className='block px-4 py-2 mb-0 hover:bg-gray-100'>Profile</Link>
                     </li>
                     <li>
                      <button onClick={logoutHandler} className='block w-full mb-0 text-left px-4 py-2 hover:bg-gray-100'>Logout</button>
                     </li>
              </ul>
            )}
          </div>
          <div className='nav-user-activities'>
          {!userInfo && (
            <ul>
            <li className='nav-lists'>
              <Link to='/login' className='nav-item flex items-center transition-transform transform hover:translate-x-2'>
                <AiOutlineLogin className="nav-item-name nav-item-icon mr-2 mt-[3rem]" size={27} />
                <span className="mt-[3rem]" size={19}>Login</span>
              </Link>
            </li>
            <li className='nav-lists'>
              <Link to='/register' className='nav-item flex items-center transition-transform transform hover:translate-x-2'>
                <AiOutlineUserAdd className="nav-item-icon mr-2 mt-[3rem]" size={27} />
                <span className="nav-item-name mt-[3rem]" size={19}>Register</span>
              </Link>
            </li>
          </ul>
          )}
          </div>
    </div>
 )
}

export default Navigation
