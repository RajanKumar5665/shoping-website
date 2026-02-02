import Feature from "../models/feature.model.js";

export const addFeatureImage = async (req, res) => {
      try {
          const { image } = req.body;
          const  featureImages = new Feature({
            image,
          });

          await featureImages.save();

            res.status(201).json({
            success: true,
            message: "Feature image added successfully",
            data: featureImages,
        });
      } catch (error) {
         console.log(error);
            res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
      }
}

export const getFeatureImages = async(req, res) => {
    try {
         const featureImages =  await Feature.find({});
         res.status(200).json({
            success: true,
            data: featureImages,
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
}