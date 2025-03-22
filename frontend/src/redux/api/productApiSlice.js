import { apiSlice } from "./apiSlice.js";
import { PRODUCT_URL, UPLOAD_URL } from '../constants.js'

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    addProduct: builder.mutation({
      query: ({keyword})=>({
        url: `${PRODUCT_URL}`,
        params: { keyword }
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"]
    }),

    getProductById: builder.query({
      query: (productId)=>`${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
          {
            type: "Product",
            id: productId
          }
      ]
    }),

    allProducts: builder.query({
      query: ()=>`${PRODUCT_URL}/allproducts`,
    }),
    
    getProductDetails: builder.query({
      query: (productId)=>({
        url :  `${PRODUCT_URL}/${productId}`
      }),
      keepUnusedDataFor: 5
    }),

    createProduct: builder.mutation({
      query: productData =>({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData
      }),
      invalidatesTags: ['Product']
    }),

    updateProduct: builder.mutation({
      query: (data) => {
        // Log the productId
        console.log("Product ID in mutation:", data.productId);
    
        return {
          url: `${PRODUCT_URL}/${data.productId}`,
          method: "PUT",
          body: data.formData,
        };
      },
    }),

    // updateProduct: builder.mutation({
    //   query: data=>({
    //     url: `${PRODUCT_URL}/${typeof data.productId == Object ? "object" : "other"}`,
    //     // url: "/",
    //     method: "PUT",
    //     body: data.formData
    //   })
    // }),

    uploadProductImage: builder.mutation({
      query: data =>({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data
      })
    }),

    deleteProduct: builder.mutation({
      query: data =>({
        url: `${PRODUCT_URL}/${data.productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"]
    }),

    createReview: builder.mutation ({
      query: data =>({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data
      })
    }),

    getTopProducts: builder.query({
      query: ()=>`${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5
    }),

    getNewProducts: builder.query({
      query: ()=>`${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5
    })
  })
})

export const {
  useAddProductMutation,
  useGetProductByIdQuery,
  useAllProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductQuery,
  useUploadProductImageMutation
} = productApiSlice