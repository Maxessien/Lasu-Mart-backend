import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    orderId: {type: String, required: true, unique: true},
    productId: {type: String, required: true},
    vendorId: {type: String, required: true},
    quantityOrdered: {type: Number, required: true, default: 1},
    orderStatus: {type: String, enum: ["pending", "completed"], required: true},
    deliveryStatus: {type: String, enum: ["pending", "delivered", "active"], required: true},
    userId: {type: String, required: true},
    address: {type: String, required: true},
    customerContactInfo: {
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
  },
    paymentStatus: {type: String, required: true},
}, {timeStamp: true})

export const Order = model("Order", orderSchema)