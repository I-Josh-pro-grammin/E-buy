import { createSlice } from "@reduxjs/toolkit";
import Product from "../../../pages/Product/Product";

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addToFavorites: (state, action)=>{
      //Check if the product is not already favorite
      if(!state.some((product)=>product._id === action.payload._id)){
        state.push(action.payload)
      }
    },
    removeFromFavorites: (state, action)=>{
      //Remove the product with the matching Id
      return state.filter((product)=>product._id !== action.payload._id)
    },
    setFavorites: (state, action)=>{
      //Set the favorites from localStorage
      return action.payload
    }
  }
})

export const { addToFavorites, removeFromFavorites, setFavorites } = favoriteSlice.actions
export const selectFavoriteProduct = state => state.favorites
export default favoriteSlice.reducer