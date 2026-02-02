import express from 'express';
import { getFilteredProducts, getProductDetails} from '../controllers/shop.controller.js';

const router = express.Router();

router.get('/get-products', getFilteredProducts);
router.get('/get-products/:id', getProductDetails);

export default router;