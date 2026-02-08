import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";
import authRouter from "./routes/auth.route.js"
import productRouter from "./routes/product.route.js"
import shopProductRouter from "./routes/shop.route.js"
import cartItem from "./routes/cart.route.js"
import addressRoute from "./routes/address.route.js"
import orderRoute from "./routes/order.route.js"
import adminOrderRouter from "./routes/adminOrder.route.js"
import searchRoute from "./routes/search.route.js"
import shopReviewRouter from "./routes/review.route.js"
import featureRouter from "./routes/feature.route.js"


const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
}));

// define midlleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

// const _dirname = path.dirname("");
// const buildpath = path.join(_dirname, "../client/dist");
// app.use(express.static(buildpath));

const PORT = process.env.PORT || 8000;


//define route
app.use('/api/auth', authRouter)
app.use('/api/product', productRouter);
app.use('/api/shop', shopProductRouter);
app.use('/api/cart', cartItem)
app.use('/api/addresses', addressRoute);
app.use('/api/orders', orderRoute);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/search', searchRoute);
app.use('/api/reviews', shopReviewRouter);
app.use('/api/features', featureRouter);


app.listen(PORT, () =>{
       console.log(`server is listening on port ${PORT}`);
})
     
     
connectDB();






