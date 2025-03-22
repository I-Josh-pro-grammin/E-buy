import { Link, useParams } from 'react-router-dom'
import { useAllProductsQuery } from './redux/api/productApiSlice.js'
import Loader from './components/Loader.jsx'
import './home.css'
import Message from './components/Message.jsx'
import Header from './components/Header.jsx'
import Product from './pages/Product/Product.jsx'
import SearchIcon from './components/SearchIcon.jsx'

const Home = () => {
  const { keyword } = useParams()
  const { data, isLoading, isError } = useAllProductsQuery({ keyword })

  return <>
    <SearchIcon /> 
    {!keyword ? <Header /> : null}
    <hr />
    {isLoading ? (<Loader />): isError?(<Message variant="danger">
      {//isError?.data.message ||
       isError.error}
    </Message>) : (
      <>
        <div className="bg-zinc-950 flex justify-between items-center">
          <h1 className="ml-[10rem] mt-[4rem] text-[3rem]">
            Special Products 
          </h1>
          <Link to="/shop" className='bg-pink-600 hover:bg-pink-700 font-bold rounded-lg py-2 px-10 mr-[18rem]  mt-[4rem]'>Shop</Link>
        </div>
        <div>
          <div className="flex justify-center flex-wrap mt-[2rem]">
              {data.map((product)=>(
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
        </div>
      </>
    )}
  </>
}

export default Home