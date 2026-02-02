import express from 'express';
import { addNewProduct, deleteProduct, fetchAllProducts, handleImageUpload, updateProduct } from '../controllers/product.controller.js';
import { upload } from '../helpers/cloudinary.js';


const router = express.Router();

router.post('/upload-image', upload.single("my_file"), handleImageUpload);
router.post('/add', addNewProduct);
router.get('/getAll', fetchAllProducts);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;