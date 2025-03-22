import { useState }  from 'react'
import { useCreateCategoryMutation,  useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchAllCategoriesQuery } from '../../redux/api/categoryApiSlice.js'
import { toast } from 'react-toastify'
import CategoryForm from '../../components/categoryForm.jsx'
import Model from '../../components/Model.jsx'

const categoryList = () => {
  const styles = {
    marginRight: 8,
     marginTop: 4,
    ":hover":{
      backgroundColor: "pink"
    },
  }


  const { data: categories } = useFetchAllCategoriesQuery();

  const [name, setName]=useState('')
  const [selectedCategories, setSelectedCategories]=useState(null)
  const [updatingName, setUpdatingName]=useState('')
  const [modelVisible, setModelVisible]=useState(false)

  const [createCategory]=useCreateCategoryMutation()
  const [deleteCategory]=useDeleteCategoryMutation()
  const [updateCategory]=useUpdateCategoryMutation()

  const handleCreateCategory = async (e)=>{
    e.preventDefault()

    if(!name){
      toast.error("Category name is required")
    }

    try {
      const result = await createCategory({name}).unwrap()
      if(result.error){
         toast.error(result.error)
      }else{
        setName('')
        toast.success(`${result.name} is created`)
      }
    } catch (error) {
      console.log(error)
      toast.error("Creating category failed, try again")
    }
  }

  const handleUpdateCategory = async (e)=>{
    e.preventDefault()

    if(!updatingName){
      toast.error("Category name is required")
      return;
    }

    try {
      const result = await updateCategory({categoryId: selectedCategories._id, updatedCategory: {
        name: updatingName
       }}).unwrap()

       if(!result){
        toast.error(result.error)
       }else{
        toast.success(`${result.name} is updated`)
        setSelectedCategories(null)
        setUpdatingName('')
        setModelVisible(false)
       }

    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCategory=async()=>{
    try {
      const result = await deleteCategory(selectedCategories._id).unwrap()
      
      if(result.error){
        toast.error("result.error")
      }else{
        toast.success(`${result.name} was deleted successfully`)
        setSelectedCategories(null)
        setModelVisible(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Category deletion failed, please try again")
    }
  }

  return <div className='ml-[10rem] flex flex-col md:flex-row'>
       {/*< Admin Menu />*/}
       <div className="md:w-3/4 p-3">
         <div className="h-13.4" style={{marginTop: "1rem"}}>Manage Categories</div>
         <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />

         <br />
         <hr />

         <div className="flex flex-wrap">
          {categories?.map((category)=>(
            <div key={category._id}>
              <button className='bg-black border border-pink-500  text-pink-500 py-2 px-4 rounded hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50' style={styles}
                onClick={()=>{{
                  setModelVisible(true)
                  setSelectedCategories(category)
                  setUpdatingName(category.name)
                }}}
              >{category.name}</button>
            </div>
          ))}
         </div>

        <Model isOpen={modelVisible} onClose={()=>{setModelVisible(false)}}>
          <CategoryForm value={updatingName} setValue={value=>setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText='Update'
            handleDelete={handleDeleteCategory}
            />
        </Model>

       </div>
  </div>
 }

export default categoryList