import express from 'express';
import { addProduct, getProducts } from '../controllers/productController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// Add a new product
router.post('/', upload.single('image'), addProduct);

// Get all products
router.get('/', getProducts);

export default router;
