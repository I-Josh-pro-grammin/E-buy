import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/api/productApiSlice.js'
import { useFetchAllCategoriesQuery } from '../../redux/api/categoryApiSlice.js'
import { toast } from 'react-toastify'
import { AdminMenu } from './AdminMenu.jsx'

const ProductList = ()=>{
  const [name, setName]=useState('')
  const [description, setDescription]=useState('')
  const [image, setImage]=useState('')
  const [price, setPrice]=useState('')
  const [category, setCategory]=useState('')
  const [brand, setBrand]=useState('')
  const [stock, setStock]=useState(0)
  const [imageUrl, setImageUrl]=useState(null)
  const [quantity, setQuantity]=useState('')
  
  const navigate  = useNavigate()

  const [uploadProductImage]=useUploadProductImageMutation()
  const [createProduct]=useCreateProductMutation()
  const {data: categories} = useFetchAllCategoriesQuery()

  const handleSubmit = async (e)=>{
    e.preventDefault()

    try {
      const productData = new FormData()
      productData.append('image', imageUrl);
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('category', category);
      productData.append('quantity', quantity);
      productData.append('brand', brand);
      productData.append('countInStock', stock);
      
      JSON.stringify(productData)
      const data = await createProduct(productData)
      console.log("Create Product Response:", data); // Debugging

      if(data.error){
        toast.error("Product creation failed. Please try again")
      }else{
        toast.success(`${data.data.name} is created`)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
      toast.error("Product creation failed. Please try again")
    }
  }

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
      
      setImage(file); // Keep local file reference
      setImageUrl(res.image); // Set the uploaded image URL
  
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error?.data?.message || "Image upload failed");
    }
  };

  
  return <div>
      <div className="container xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu /> 
          <div className="md:w-3/4 ">
            <div className="h-70 m-auto  font-bold py-5">Create Product</div>
            {imageUrl && (
              <div className="text-center h-[30%] w-[100%] m-0">
                <img src={imageUrl} alt="product" className="my-0 rounded-lg mx-auto w-[100%] h-[100%]" />
              </div>
            )}

            <div className="mb-3">
              <label htmlFor='image' className="border my-0 text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                { image ? image.name : "Upload Image" }
              </label>


              <input 
              type="file" 
              id='image'
              name='image'
              accept='image/*'
              onChange={uploadFileHandler}
              className={!image ? "hidden" : 
              "text-white"} />
            </div>

            <div className="p-3">
              <div className="flex flex-wrap w-[120%]">
                <div className="one ml-5">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="focus:border-pink-700 focus:border-1  focus:shadow-slate-500 focus:shadow-sm block p-3 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <div className="two ml-5">
                  <label htmlFor="name block">Price</label>
                  <input type="number" className="focus:border-pink-700 focus:border-1 focus:shadow-slate-500 focus:shadow-sm  block p-3 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                  value={price} 
                  onChange={e=>setPrice(e.target.value)} 
                  />
                </div>
                <div className="third ml-5">
                  <label htmlFor="name block">Quantity</label>
                  <input type="number" className="focus:border-pink-700 focus:border-1 focus:shadow-slate-500 focus:shadow-sm  block p-3 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                  value={quantity} 
                  onChange={e=>setQuantity(e.target.value)} 
                  />
                </div>
                <div className="four ml-5">
                  <label htmlFor="name block">Brand</label>
                  <input type="text" className="focus:border-pink-700 focus:border-1.6 focus:shadow-slate-500 focus:shadow-sm  block p-3 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white" 
                  value={brand} 
                  onChange={e=>setBrand(e.target.value)} 
                  />
                </div>
              </div>

              <label htmlFor="" className='my-5'>Description</label>
              <textarea type="text" 
              value={description} 
              className="p-2 mb-3 focus:border-pink-700 focus:border-1 bg-[#101011] border rounded-lg w-[95%] text-white"
              onChange={e=>setDescription(e.target.value)}
              ></textarea>

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">Count In Stock</label>
                  <input 
                  type="number"
                  className='focus:border-pink-600 focus:border-1  focus:shadow-slate-500 focus:shadow-sm  block p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' 
                  value={stock} onChange={e=>setStock(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">Category</label><br />
                <select 
                aria-placeholder='Choose Category' 
                className='block p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white'
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
             className='py-2 px-8 mt-5 rounded-lg text-lg font-bold bg-pink-500 hover:bg-pink-600'
            >Submit</button>
          </div>
        </div>
      </div>

  </div>
}

export default ProductList