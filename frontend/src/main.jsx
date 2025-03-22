import ReactDOM from 'react-dom/client'
import './App.css'
import './index.css'
import App from './App.jsx'
import Home from './Home.jsx'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom'
// Ensure these imports are not duplicated or conflicting
import { Provider } from 'react-redux'
import store from './redux/store.js'
import CategoryList from './pages/Admin/categoryList.jsx'
import ProductList from './pages/Admin/productList.jsx'
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
//PRIVATE ROUTE
import PrivateRoute from './components/privateRoute.jsx'

//Auth
import Login from './pages/Auth/Login.jsx'

import Profile from './pages/User/profile.jsx'
import Register from './pages/Auth/Register.jsx'

//Admin
import AdminRoute from './pages/Admin/adminRoute.jsx'
import UserList from './pages/Admin/userList.jsx'
import AllProducts  from './pages/Admin/AllProducts.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login />} />
      <Route index={true} path='/' element={<Home />} />

      <Route path="" element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}/>
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path='productlist/' element={<ProductList />} />
        <Route path='product/update/:id' element={<ProductUpdate />} />
        <Route path='allproducts' element={<AllProducts />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
