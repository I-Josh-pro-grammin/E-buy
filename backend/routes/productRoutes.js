import express from 'express'
import formidable from 'express-formidable'
//controllers
import { addProduct, updateProductDetails, removeProduct, fetchProducts, fetchProductsById, fetchAllProducts, addProductReview, fetchTopProducts, fetchNewProducts } from '../controllers/productController.js'
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'
import { checkId } from '../middlewares/checkId.js'

const router = express.Router()

router.route('/')
.get(fetchProducts)
.post(authenticate, authorizeAdmin, formidable(), addProduct)

router.route('/allproducts')
.get(fetchAllProducts)
router.route('/:id/reviews')
.post(authenticate, authorizeAdmin, checkId,   addProductReview)

router.get('/top', fetchTopProducts)
router.get('/new', fetchNewProducts)

router.route('/:id')
.get(fetchProductsById)
.put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
.delete(authenticate, authorizeAdmin, removeProduct)



export default router
