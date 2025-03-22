import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const SmallProduct = ({product}) => {
   return (
    <div className="w-[17rem]  ml-[3.7rem] px-0 py-3">
      <div className="relative" >
        <img
        src={product.image}
        alt={product.name}
        className='h-[17rem] w-[17rem] rounded'
        />

        <HeartIcon product={product}/>
   
        <div className="p-54">
          <Link to={`/product/${product._id}`} >
            <h2 className="flex justify-between items-enter">
              <div>{product.name}</div>
              <span className="bg-pink-100 text-pink-800 hover:bg-pink-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">$ {product.price}</span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
   )
}

export default SmallProduct