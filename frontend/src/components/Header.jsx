import { useGetTopProductsQuery } from "../redux/api/productApiSlice.js"
import Loader from "./Loader.jsx"
import SmallProduct from "../pages/Product/SmallProduct.jsx"
import ProductCarousel from "../pages/Product/ProductCarousel.jsx"

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery()
  console.log(data)
  
  if(isLoading){
    return <Loader />
  }

  if(error){
    return <h1>ERROR</h1>
  }

  return <>
  <ProductCarousel />
  <div className="flex justify-content">
    <div className="xl:block lg:hidden md:hidden sm:hidden">
      <div className="flex flex-row">
        {data.map(product=>(
          <div key={product._id}>
            <SmallProduct product={product} />
          </div>
        ))}
      </div>
    </div>
  </div>
  </>
}

export default Header