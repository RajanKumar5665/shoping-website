import { v2 as cloudinary } from "cloudinary";
import multer from "multer";


// console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


//multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });


// Cloudinary upload 
const imageUploadUtils = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "mern_uploads",
    resource_type: "auto",
  });

  return result;
};

export { upload, imageUploadUtils };
export default cloudinary;
