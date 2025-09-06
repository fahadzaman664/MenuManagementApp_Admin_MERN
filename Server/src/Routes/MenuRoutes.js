import express from "express"
import { createMenu, updateMenu } from "../Controllers/MenuController.js";
import multer from "multer";
import { upload } from "../config/CloudinaryConfig.js";
const menuRoutes = express.Router();

menuRoutes.post("/create-menu", upload.single('file'), createMenu)
menuRoutes.put("/update-menu/:id", upload.single('file'), updateMenu)
export default menuRoutes;