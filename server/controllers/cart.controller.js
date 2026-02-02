import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const addCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const qty = Number(quantity);

    if (!userId || !productId || Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity: qty });
    } else {
      cart.items[findCurrentProductIndex].quantity += qty;
    }

    await cart.save();
    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while adding item to cart",
    });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is Mandatory!",
      });
    }

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "image title price salePrice",
    );

    if (!cart) {
      return res.status(200).json({
        success: false,
        message: "Cart is empty!",
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId,
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching cart items",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart not found!",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (findCurrentProductIndex == -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present!",
      });
    }
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate("items.productId", "image title price salePrice");

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured from updateCartQuantity",
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "image title price salePrice",
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => String(item?.productId?._id || item?.productId) !== productId,
    );

    await cart.save();

    await cart.populate("items.productId", "image title price salePrice");
    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured from deleteCartItem",
    });
  }
};
