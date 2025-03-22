import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js"
import Message from "../../components/Message.jsx"
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from "moment"
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore
} from 'react-icons/fa'

const ProductCarousel = () => {
  const {data: products, isLoading, error}=useGetTopProductsQuery()
  console.log(products)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    autoplay: true,
    autoplaySpee: 3000
  }

  return <div className="mr-4 ml-[5rem] xl:block lg:block md:block">
    {isLoading ? null : error ?(
      <Message variant={'danger'}>
        {error?.data?.message || error.message}
      </Message>
    )    : <Slider
      {...settings} className="xl:w-[70rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block "
    >
      {products.map(({image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock}) => (
        <div key={_id}>
          <img src={image} alt={name} className=" mt-3 rounded-lg object-cover w-[140rem] h-[38rem]" />
          <div className="flex justify-between w-[20rem] mt-16">
            <div className="one">
              <h2>{name}</h2>
              <p>$ {price}</p><br />
              <br />
              <FaBox />
              <p className="w-[20rem]">{description.substring(0, 170)}...</p>
            </div>
            <div className="flex justify-between mt-1 w-[20rem]">
              <div className="one">
                <h1 className="flex items-center ml-[10rem] mb-6 w-[15rem]">
                  <FaStore className="mr-2 text-white" /> Brand: {brand}
                </h1>
                <h1 className="flex items-center ml-[10rem] mb-6 w-[15rem]">
                  <FaClock className="mr-2 text-white" /> Added: {" "} {moment(createdAt).fromNow()}
                </h1>
                <h1 className="flex items-center ml-[10rem] mb-6 w-[15rem]">
                  <FaStore className="mr-2 text-white" /> Reviews : {" "} {numReviews}
                </h1>
              </div>
              <div className="two">
                  <h1 className="flex items-center mb-7 ml-[17rem] w-[9rem] ">
                    <FaStar className="mr-2 text-white" /> Ratings: {Math.round(rating)}
                  </h1>
                  <h1 className="flex items-center mb-7 ml-[17rem] w-[9rem] ">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity: {quantity}
                  </h1>
                  <h1 className="flex items-center mb-7 ml-[17rem] w-[9rem] ">
                    <FaBox className="mr-2 text-white" /> In Stock: {countInStock}
                  </h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  }
  <hr />
  </div>
  
}

export default ProductCarousel