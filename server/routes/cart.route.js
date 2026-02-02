import express, { Router } from 'express'
import { addCartItem, deleteCartItem, getCartItems, updateCartQuantity } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/add', addCartItem);
router.get('/get/:userId', getCartItems);
router.put('/update-cart', updateCartQuantity);
router.delete('/:userId/:productId', deleteCartItem);

export default router;