import express from "express"
import { createMenu, deleteMenu, fetchAllMenu, updateMenu } from "../Controllers/MenuController.js";
import { upload } from "../config/CloudinaryConfig.js";
import verifyToken from "../Middlewares/AuthMiddleWare.js";
import roleAuthorization from "../Middlewares/RoleMiddleWare.js";
const menuRoutes = express.Router();

// menuRoutes.post("/create-menu", upload.single('file'),verifyToken,roleAuthorization("admin"), createMenu)
// menuRoutes.put("/update-menu/:id", upload.single('file'), verifyToken,roleAuthorization("admin"),updateMenu)
// menuRoutes.get("/fetch-all-menu",verifyToken,roleAuthorization("admin"), fetchAllMenu);
// menuRoutes.delete("/delete-menu/:id",verifyToken,roleAuthorization("admin"), deleteMenu)
menuRoutes.post("/create-menu", upload.single('file'),verifyToken,roleAuthorization("admin"), createMenu);
menuRoutes.put("/update-menu/:id", upload.single('file'),verifyToken,roleAuthorization("admin"),updateMenu);
menuRoutes.get("/fetch-all-menu",fetchAllMenu);
menuRoutes.delete("/delete-menu/:id",verifyToken,roleAuthorization("admin"), deleteMenu);
export default menuRoutes;