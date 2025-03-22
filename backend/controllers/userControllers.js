import asyncHandler from '../middlewares/asyncHandler.js'
import User from '../models/userModels.js'
import bcrypt from 'bcryptjs'
import createToken from '../utils/createToken.js'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })
  
  if (user) {
    createToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const existingUser = await User.findOne({email})
  if(existingUser){
    const isPasswordValid = await bcrypt.compare(password, existingUser.password)
    if(isPasswordValid){
      createToken(res, existingUser._id)

      res.json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      })
      }
  }else{
    res.status(401).json({
      message: "User not found"
    }
    )
  }
  return 
})

const logoutCurrentUser = asyncHandler (async (req, res)=>{
  res.cookie("jwt", '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({message: "Logged out successfully"})
})

const getAllUsers = asyncHandler(async(req, res)=>{
  const users = await User.find({})
  res.send(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res)=>{
  const user = await User.findById(req.user._id)

  if(user){
    res.status(200).json(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    )
  }else{
    res.status(404).json({message: "User not found"})
  }
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(req.body.password, salt)
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400).send("Cannot delete admin user");
      return;
    } 

    await user.deleteOne({_id: user._id});
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).send("User not found");
  }
});

const getUserById = asyncHandler( async(req, res)=>{
  console.log('User ID:', req.params.id) // Add this line to log the user ID
  const user = await User.findById(req.params.id).select("-password")
  
  if(user){
   res.json({user}) 
  }else{
    res.status(404)
    throw new Error("User not found")
  }
})

const updateUserById = asyncHandler(async (req, res)=>{
  const user = await User.findById(req.params.id).select("-password")

  if(user){
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      user.isAdmin = Boolean(req.body.isAdmin)
      
      const updatedUser = await user.save()
      res.status(200).json({
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        })
  }else{
    res.status(404).send("User not found")
  }
})

export { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById }