import express from 'express'
import { regsiterUser } from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';
import { logoutUser } from '../controllers/auth.controller.js';
import { authMiddleware } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', regsiterUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', authMiddleware, (req, res) => {
   res.status(200).json({
      success: true,
      message: "User authenticated",
      user: req.user,
   });
});


export default router
