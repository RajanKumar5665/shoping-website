import Product from "../models/product.model.js";

export const searchProducts = async (req, res) => {
    try {
         const { keyword } = req.params;
         if(!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Keyword is required and must be a non-empty string",
            });
         }
         const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive

         const createSearchQuery = {
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { category: { $regex: regex } },
                { brand: { $regex: regex } },
            ],
            };

            const searchResults = await Product.find(createSearchQuery);
        res.status(200).json({
            success: true,
            data: searchResults,
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};