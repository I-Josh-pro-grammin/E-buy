import path from 'path'
import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import categoryRoutes from './routes/categoryRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

//DB  utils
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config() // Load environment variables from .env file

connectDB()

const app = express()

app.use(express.json()) // Ensure this is a function call
app.use(urlencoded({ extended: true })) // Ensure this is a function call
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname + "/uploads")))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

