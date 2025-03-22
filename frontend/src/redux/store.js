import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./Api/apiSlice";  // Ensure correct import
import authReducer from "./Features/Auth/authSlice.js";
import favoriteReducer from "../redux/Features/favorites/favoritesSlice.js"
import { getFavoritesFromLocalStorage } from "../Utils/localStorage.js";

const initialFavorites = getFavoritesFromLocalStorage()

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,  // ✅ Add this line to fix your issue
    favorites: favoriteReducer,
  },

  preloadedState:{
    favorites: initialFavorites
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

setupListeners(store.dispatch);
export default store;
