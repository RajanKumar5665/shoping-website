import ProductReview from "../models/review.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const addProductReview = async(req, res) =>{
       try {
            const {productId, userId, userName, reviewMessage, reviewValue } = req.body;
            const order = await Order.findOne({ userId, "cartItems.productId": productId, orderStatus: "confirmed" });
            if(!order){
                return res.status(400).json({
                    success: false,
                    message: "You can only review products you have purchased."
                });
            }
            const checkExistingReview = await ProductReview.findOne({ productId, userId });

            if(checkExistingReview){
                return res.status(400).json({
                    success: false,
                    message: "You have already reviewed this product."
                });
            }
            const newReview = new ProductReview({
                productId,
                userId,
                userName,
                reviewMessage,
                reviewValue
            });
            await newReview.save();

            const reviews = await ProductReview.find({ productId });
            const totalReviews = reviews.length;
            const averageReview = totalReviews > 0 ? (reviews.reduce((acc, item) => acc + item.reviewValue, 0) / totalReviews) : 0; 

            await Product.findByIdAndUpdate(productId, {
                averageReview,
            });
            res.status(201).json({
                success: true,
                message: "Review added successfully",
                data: newReview,
            });
       } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
       }
}

export const getProductReviews = async(req, res) =>{
    try {
        const { productId } = req.params;
        const reviews = await ProductReview.find({ productId });
        res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};