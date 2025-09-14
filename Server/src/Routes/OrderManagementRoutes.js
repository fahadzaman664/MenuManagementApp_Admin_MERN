import express from "express"
import { allOrders, assignToDriver, changeOrderStatus, deliveryStatus, driverOrders, placeOrder } from "../Controllers/OrderManagementController.js";
import verifyToken from "../Middlewares/AuthMiddleWare.js";
import roleAuthorization from "../Middlewares/RoleMiddleWare.js";

const orderRoutes = express.Router();

orderRoutes.post("/place-order",verifyToken, placeOrder);
orderRoutes.post("/order-assign-driver",verifyToken,roleAuthorization("admin"), assignToDriver);
orderRoutes.put("/change-order-status",verifyToken,roleAuthorization("admin"),changeOrderStatus);
orderRoutes.post("/delivery-status",verifyToken,roleAuthorization("admin", "driver"), deliveryStatus)
orderRoutes.get("/allorders",verifyToken, allOrders)
orderRoutes.get("/driver-orders",verifyToken, driverOrders)

export default orderRoutes;