
import Order from "../Models/OrderManagementModel.js";
export const placeOrder = async (req, res) => {
    try {
        const { itemname, price, description, address } = req.body;
        const orderby = req.user.userId;

        if ([itemname, price, description, address].some((field) => !field)) {
            return res.status(400).send("Please fill all required fields");
        }

        const newOrder = new Order({
            orderby,
            itemname,
            price,
            description,
            address
        });
        await newOrder.save();

        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            newOrder
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const assignToDriver = async (req, res) => {
    try {
        const { orderId, driverId } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                driver: driverId, orderstatus: "assigned", orderstatuschangetime: Date.now()
            },
            { new: true }
        ).populate("driver", "name email");

        if (!updatedOrder)
            return res.status(404).json({ message: "Order not found" });

        res.status(200).json({
            success: true,
            message: "Order assigned to driver",
            updatedOrder: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const changeOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const allowedStatuses = ["accepted", "rejected", "complete"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updateStatus = await Order.findByIdAndUpdate(
            orderId,
            { orderstatus: status, orderstatuschangetime: Date.now() },
            { new: true }
        );

        if (!updateStatus)
            return res.status(404).json({ message: "Order not found" });

        res.status(200).json({
            success: true,
            message: "Order status updated",
            updateStatus
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deliveryStatus = async (req, res) => {
    try {
        const { orderId, deliveryStatus } = req.body;
        const driverId = req.user.userId;

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        if (String(order.driver) !== String(driverId)) {
            return res.status(403).json({ message: "Not authorized for this order" });
        }

        if (deliveryStatus === "picked-up") {
            order.deliveryStatus = "assigned"
        }
        if (deliveryStatus === "delivered") {
            order.deliveryStatus = "complete"
        }

        order.deliveryStatus = deliveryStatus;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Delivery status updated",
            order
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const allOrders = async (req, res) => {
    try {
        const role = req.user.userRole; // assuming you store role in JWT (admin/user/driver)
        const userId = req.user.userId;

        let query = {};
        console.log(role)


        if (role === "user") {
            // user should only see their own orders
            query.orderby = userId;
        } else if (role === "driver") {
            // driver should only see orders assigned to them
            console.log(role)
            query.driver = userId;
        }
        // admin will see all orders → no filter applied

        const orders = await Order.find(query)
            .populate("orderby", "name email")
            .populate("driver", "name email")
            .sort({ createdAt: -1 }); // newest first


        // Format data for frontend
        const formattedOrders = orders.map((order) => ({
            id: order._id,
            orderstatus: order.orderstatus,
            name: order.orderby?.name || "Unknown",
            itemname: order.itemname,
            deliverystatus: order.deliveryStatus,
            orderstatus: order.orderstatus,
            assignedto: order.driver?.name,
            address: order.address,
            amount: order.price,
        }));

        res.status(200).json({
            success: true,
            count: formattedOrders.length,
            orders: formattedOrders,
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const driverOrders = async (req, res) => {
  try {
    const driverId = req.user.userId; 

    const orders = await Order.find({ driver: driverId })
      .populate("orderby", "name email") 

    if (orders.length === 0) {
      return res.status(404).json({ message: "No assigned orders found" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching driver orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};
