import express from "express";
import { addFeatureImage, getFeatureImages } from "../controllers/feature.controller.js";

const router = express.Router();

// Client calls:
// - POST /api/features/add
// - GET  /api/features/
router.post('/add', addFeatureImage);
router.post('/', addFeatureImage);

router.get('/', getFeatureImages);
router.get('/get', getFeatureImages);

export default router;