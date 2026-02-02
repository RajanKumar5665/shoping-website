import Product from "../models/product.model.js";

export const getFilteredProducts = async (req, res) => {
  try {
    const { categories, brands, sortBy } = req.query;

    const filters = {};

    if (categories) {
      const categoryList = String(categories)
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

      if (categoryList.length > 0) {
        filters.category = { $in: categoryList };
      }
    }

    if (brands) {
      const brandList = String(brands)
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

      if (brandList.length > 0) {
        filters.brand = { $in: brandList };
      }
    }

    let sort = {};
    if (sortBy === "price-asc") sort = { price: 1 };
    else if (sortBy === "price-desc") sort = { price: -1 };
    else if (sortBy === "title-asc") sort = { title: 1 };
    else if (sortBy === "title-desc") sort = { title: -1 };

    const products = await Product.find(filters).sort(sort);
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching filtered products",
    });
  }
};

export const getProductDetails = async(req, res) =>{
        try {
            const { id } = req.params;
            const product = await Product.findById(id);

            if(!product){
         return res.status(404).json({
                     success: false,
                     message: 'product not found!'
                 })
            }

      return res.status(200).json({
                success: true,
                data: product
            })
        } catch (error) {
             console.log(error);
       return res.status(500).json({
                success: false,
                message: "Product Details error occured"
             })
        }
}
