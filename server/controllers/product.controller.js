import { imageUploadUtils } from "../helpers/cloudinary.js";
import { Product } from "../models/product.model.js";

export const handleImageUpload = async (req, res) => {
  try {
    // console.log("File received:", req.file);
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageUploadUtils(dataURI);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading image",
    });
  }
};

//Add new product
export const addNewProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newCreateProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    })
    await newCreateProduct.save();
    res.status(201).json({
       success: true,
       data: newCreateProduct
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

//fetch all products
export const fetchAllProducts = async (req, res) => {
  try {
        const listOfProduct = await Product.find({});
        res.status(200).json({
            success:true,
            data: listOfProduct
        })
  } catch (error) {
       console.log(error);
        res.status(500).json({
            success:false,
            message:"Fetching error Occured"
        })
  }
};

//edit a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    findProduct.image = image ?? findProduct.image;
    findProduct.title = title ?? findProduct.title;
    findProduct.description = description ?? findProduct.description;
    findProduct.category = category ?? findProduct.category;
    findProduct.brand = brand ?? findProduct.brand;
    findProduct.price = price ?? findProduct.price;
    findProduct.salePrice = salePrice ?? findProduct.salePrice;
    findProduct.totalStock = totalStock ?? findProduct.totalStock;

    await findProduct.save();

    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while updating product",
    });
  }
};


//delete a product
export const deleteProduct = async (req, res) => { 
    
  try {
      const {id} = req.params;
      const findProduct = await Product.findById(id);
      if(!findProduct) 
        return res.status(400).json({
          success:false,
          message: "Product not found",
       })
        await Product.findByIdAndDelete(id);
        res.status(200).json({
          success:true,
          message: "Product deleted successfully"
        })
  } catch (error) {
      console.log(error);
      res.status(500).json({
        success:false,
        message: "Error occured while deleting product"
      })
  }
};
