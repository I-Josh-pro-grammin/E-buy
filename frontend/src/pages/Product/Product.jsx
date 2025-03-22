import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon.jsx'

const Product = ({product}) => {
  return (
    <div className="w-[22rem] ml-[2rem] p-3 relative">
      <div className="relative">
        <img src={product.image} alt={product.image} className='w-[20rem] h-[18rem] rounded' />
        <HeartIcon product={product}/>
      </div>

      <div className="py-3">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            <div className="text-lg">{product.name}</div>
            <span className="bg-pink-100 text-pink-800 hover:bg-pink-600 text-sm font-medium mr-20 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">$ {product.price}</span>

          </h2>
        </Link>
      </div>
    </div>
  )
}

export default Product