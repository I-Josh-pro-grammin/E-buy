import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSelector, useDispatch }  from 'react-redux'
import { 
  addToFavorites,
  removeFromFavorites,
  setFavorites
  } from '../../redux/Features/favorites/favoritesSlice.js'
import { 
  addFavoritesToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoritesFromLocalStorage
} from '../../Utils/localStorage.js'
import { useEffect } from 'react'

const HeartIcon = ({product}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => {
    console.log('Current favorites state:', state.favorites);
    return state.favorites || [];
  });
  const isFavorites = favorites.some(p => p._id === product._id);
  
  console.log('Product:', product._id, 'Is Favorite:', isFavorites);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    console.log('LocalStorage favorites:', favoritesFromLocalStorage);
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorite = () => {
    if(isFavorites){
      dispatch(removeFromFavorites(product))
      removeFavoritesFromLocalStorage(product._id)
    }else{
      dispatch(addToFavorites(product))
      addFavoritesToLocalStorage(product)
    }
  }
  
  return (
    <div onClick={toggleFavorite} className="absolute top-2 right-5 cursor-pointer">
      { isFavorites ? (
        <FaHeart className='text-pink-500' />
      ) : (
        <FaRegHeart className="text-white" />
      )
    }
    </div>
  )
}

export default HeartIcon