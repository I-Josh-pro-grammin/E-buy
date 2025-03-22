import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCategory = asyncHandler(async (req, res)=>{
   try {
     const { name } = req.body;
     
     if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }    
    
    const existingCategory = await Category.findOne({ name })

    if(existingCategory){
      return res.json({error: "Already exists"})
    }

    const category = await new Category({ name }).save()
    res.json(category)
   } catch (error) {
    console.log(error)
    res.status(400).json(error)
   }
}) 

const updateCategory = asyncHandler (async(req, res)=>{ 
  try {
  const { name } = req.body
  const { categoryId } = req.params

  const category = await Category.findOne({ _id: categoryId })

  if(!category){
    return res.status(404).json({error: "Category Not Found"})
  }

  category.name = name
  const updatedCategory = await category.save()
  res.json(updatedCategory) 
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})

const removeCategory = asyncHandler(async(req, res)=>{
  try {
    const existingCategory = await Category.findById(req.params.categoryId)
    if(!existingCategory){
      res.status(404).json({message: "Category not found"})
    }

    const remove = await Category.findByIdAndDelete(req.params.categoryId)
    res.json({
       "message": "Successfully deleted category",
       "category": remove
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})

const getAllCategories = asyncHandler(async(req, res)=>{
  try {
    const all = await Category.find({})
    res.json(all)
  } catch (error) {
    console.log(error)
    res.status(500).json( error.message )
  }
})

const readCategory = asyncHandler(async(req, res)=>{
  try {
    const category = await Category.findById(req.params._id);
    res.json(category) 
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

export{ createCategory, updateCategory, removeCategory, getAllCategories, readCategory }