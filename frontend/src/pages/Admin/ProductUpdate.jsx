import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation
 } from '../../redux/api/productApiSlice.js'
import { AdminMenu } from './AdminMenu.jsx'
import { useFetchAllCategoriesQuery } from '../../redux/api/categoryApiSlice.js'
import { toast } from 'react-toastify'

const ProductUpdate = ()=>{
  const params = useParams()
  const {data: productData} = useGetProductByIdQuery(params.id)
  
  const [image, setImage]= useState(productData?.image || "")
  const [name, setName]=useState(productData?.name || "")
  const [description, setDescription]=useState(productData?.description || "")
  const [price, setPrice]=useState(productData?.price || "")
  const [quantity, setQuantity]=useState(productData?.quantity || "")
  const [category, setCategory]=useState(productData?.category || "")
  const [brand, setBrand]=useState(productData?.brand || "")
  const [stock, setStock]=useState(productData?.countInStock || 0)

  const navigate = useNavigate()
  const {data: categories}=useFetchAllCategoriesQuery()
  const [uploadProductImage]=useUploadProductImageMutation()
  const [updateProduct]=useUpdateProductMutation()
  const [deleteProduct]=useDeleteProductMutation()

  useEffect(()=>{
    if(productData && productData._id){
      setName(productData.name)
      setDescription(productData.description)
      setPrice(productData.price)
      setCategory(productData.category?._id)
      setQuantity(productData.quantity)
      setBrand(productData.brand)
      setImage(productData.image)
    }
  }, [productData])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
  
      // Check if params.id is correct
      console.log("Product ID:", params.id); 
  
      if (!params.id || typeof params.id !== 'string') {
        toast.error("Invalid product ID");
        return;
      }
  
      // Send the request properly
      console.log(formData.quantity)
      const res = await updateProduct({ productId: params.id, formData }).unwrap(); // ✅ FIXED
  
      toast.success(`${res.name} is successfully updated`);
      navigate("/admin/productlist");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error?.data?.message || "Product update failed. Please try again.");
    }
  };  
  

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
  
    if (!file) {
      toast.error("No file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await uploadProductImage(formData).unwrap();
      
      console.log("Upload Response:", res); // Debugging
      console.log("Image URL:", res.image); // Debugging
  
      if (!res.image) {
        throw new Error("Image upload failed, no image URL returned");
      }
  
      toast.success(res.message);
      
      setImage(res.image); // Keep local file reference
  
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error?.data?.message || "Image upload failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    console.log("Product ID before delete:", params.id);
  
    if (!params.id) {
      toast.error("Invalid product ID");
      return;
    }
  
    try {
      const response = await deleteProduct({ productId: params.id }).unwrap();  // ✅ FIXED: Pass an object
  
      console.log("Delete response:", response);
      toast.success("Product deleted successfully");
      navigate('/admin/productlist'); 
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error?.data?.message || "Failed to delete product");
    }
  };
  
  
  
  return <div>
  <div className="container xl:mx-[9rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
      <AdminMenu /> 
      <div className="md:w-3/4 ">
        <div className="h-12 font-bold py-5">Create Product</div>
        {image && (
          <div className="text-center h-[32.1%] w-[100%] m-0">
            <img src={image} alt="product" className="my-0 mx-auto w-[50%] h-[22rem]" />
          </div>
        )}

          <div className="mb-6 text-center">
            <label htmlFor="image" className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image instanceof File ? image.name : "Upload Image"}
            </label>
            <input 
            type="file" 
            id="image"
            name="image"
            accept="image/*"
            onChange={uploadFileHandler} 
            className="hidden"
          />
          </div>

        <div className="p-3">
          <div className="flex flex-wrap w-[120%]">
            <div className="one ml-5">
              <label htmlFor="name">Name</label>
              <input type="text" className="focus:border-pink-500 focus:shadow-slate-500 focus:shadow-sm block p-3 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="two ml-5">
              <label htmlFor="name block">Price</label>
              <input type="number" className="focus:border-pink-500 focus:shadow-slate-500 focus:shadow-sm  block p-3 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
              value={price} 
              onChange={e=>setPrice(e.target.value)} 
              />
            </div>
            <div className="third ml-5">
              <label htmlFor="name block">Quantity</label>
              <input type="number" className="focus:border-pink-500 focus:shadow-slate-500 focus:shadow-sm  block p-3 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
              value={quantity} 
              onChange={e=>setQuantity(e.target.value)} 
              />
            </div>
            <div className="four ml-5">
              <label htmlFor="name block">Brand</label>
              <input type="text" className="focus:border-pink-500 focus:shadow-slate-500 focus:shadow-sm  block p-3 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
              value={brand} 
              onChange={e=>setBrand(e.target.value)} 
              />
            </div>
          </div>

          <label htmlFor="" className='my-5'>Description</label>
          <textarea type="text" 
          value={description} 
          className="p-2 mb-3 bg-[#101011] focus:border-pink-500 border rounded-lg w-[95%] text-white"
          onChange={e=>setDescription(e.target.value)}
          ></textarea>

          <div className="flex justify-between">
            <div>
              <label htmlFor="name block">Count In Stock</label>
              <input 
              type="number"
              className='block p-4 mb-3 w-[30rem] focus:shadow-slate-500 focus:shadow-sm  focus:border-pink-500 border rounded-lg bg-[#101011] text-white' 
              value={stock} onChange={e=>setStock(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="">Category</label><br />
            <select 
            aria-placeholder='Choose Category' 
            className='block p-4 mb-3 w-[30rem] border shadow-sm shadow-white rounded-lg bg-[#101011] text-white'
            onChange={e=>setCategory(e.target.value)}
            >
              {categories?.map((c)=>(
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
         onClick={handleSubmit}
         type='submit'
         className='py-2 px-8 mt-5 rounded-lg text-lg font-bold bg-green-500 hover:bg-green-600 mr-6'
        >Update</button>
        <button
         onClick={handleDelete}
         type='submit'
         className='py-2 px-8 mt-5 rounded-lg text-lg font-bold bg-red-500 hover:bg-red-600'
        >Delete</button>
      </div>
    </div>
  </div>

</div>
}

export default ProductUpdate