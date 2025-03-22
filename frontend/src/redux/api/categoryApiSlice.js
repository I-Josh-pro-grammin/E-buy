import { apiSlice } from "./apiSlice.js";
import { CATEGORY_URL } from "../constants.js"
import { createCategory, updateCategory } from "../../../../backend/controllers/categoryController.js";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder =>({
    createCategory: builder.mutation({
      query: newCategory=>({
        url:  `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory
      })
    }),
    updateCategory: builder.mutation({
      query: ({categoryId, updatedCategory})=>({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory
      })
    }),
    deleteCategory: builder.mutation({
      query: id => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      })
    }),
    fetchAllCategories: builder.query({
      query: ()=>`${CATEGORY_URL}/categories`
    })
  })
})

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchAllCategoriesQuery,
}  =  categoryApiSlice