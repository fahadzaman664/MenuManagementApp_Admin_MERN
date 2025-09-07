import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  itemname: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },

  // Order lifecycle
  orderstatus: {
    type: String,
    enum: ["accepted", "rejected", "complete", "assigned"],
    default: "accepted"
  },
  orderplacetime: { type: Date, default: Date.now },
  orderstatuschangetime: { type: Date, default: Date.now },

  // Driver assignment
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // assuming driver is also in User collection
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "picked-up", "delivered"],
    default: "pending"
  }
},{
  timestamp:true
});

const Order = mongoose.model("OrderManagement", orderSchema);
export default Order;
