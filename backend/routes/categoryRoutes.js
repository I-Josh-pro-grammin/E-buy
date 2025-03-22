import express from 'express'
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';
import { createCategory, updateCategory, removeCategory, getAllCategories, readCategory } from '../controllers/categoryController.js';

const router = express.Router()

router.route('/').post(authenticate, authorizeAdmin, createCategory)
router.route('/:categoryId')
.put(authenticate, authorizeAdmin, updateCategory)
.delete(authenticate, authorizeAdmin, removeCategory)

router.route('/categories').get(getAllCategories)

router.route('/:_id').get(readCategory)

export default router;