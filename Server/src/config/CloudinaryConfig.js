import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path"
import dotenv from "dotenv"
dotenv.config();

console.log(">>> CloudinaryConfig.js loaded");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./my-uploads/"); // create uploads folder in root
    }, filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
// Multer Storage (store directly in Cloudinary)
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "menu_images", // folder name in Cloudinary
//     allowed_formats: ["jpg", "png", "jpeg", "webp"],
//   },
// });

const upload = multer({ storage });

export { cloudinary, upload };
