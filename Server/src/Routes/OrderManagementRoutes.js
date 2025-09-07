import express from "express"
import { assignToDriver, changeOrderStatus, deliveryStatus, placeOrder } from "../Controllers/OrderManagementController.js";
import verifyToken from "../Middlewares/AuthMiddleWare.js";
import roleAuthorization from "../Middlewares/RoleMiddleWare.js";

const orderRoutes = express.Router();

orderRoutes.post("/place-order", placeOrder);
orderRoutes.post("/order-assign-driver",verifyToken,roleAuthorization("admin"), assignToDriver);
orderRoutes.put("/change-order-status",verifyToken,roleAuthorization("admin"),changeOrderStatus);
orderRoutes.post("/delivery-status",verifyToken,roleAuthorization("admin", "driver"), deliveryStatus)
export default orderRoutes;