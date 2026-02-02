import { Address } from "../models/address.model.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;
    // console.log("Add Address Request Body: ", req.body);
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      pincode,
      phone,
      notes,
    });

    await newAddress.save();
    return res.status(200).json({
      success: true,
      data: newAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured in addAddress",
    });
  }
};

export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log("Fetching addresses for userId: ", userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Not Find User id",
      });
    }

    const addressList = await Address.find({ userId });
    // console.log("Address List Retrieved: ", addressList);

    return res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occured In fetchAllAddress",
    });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true },
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occured from EditAddress",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndDelete({
         _id: addressId,
         userId
    })

    if(!address){
        return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

     res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occured from deleteAddress",
    });
  }
};
