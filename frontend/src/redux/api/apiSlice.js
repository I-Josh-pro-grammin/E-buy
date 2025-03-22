import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

// Ensure no Node.js modules are imported or used here
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User', 'Category'],
  endpoints: () => ({})
})
