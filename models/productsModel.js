import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    discount: {type: Number, required: true, default: 0},
    imageUrl: {type: String, required: true},
    productId: {type: String, required: true, unique: true},
    category: {type: Array, required: true},
    productReviews: {type: Arrary, required: true, default: []},
    vendorId: {type: String, required: true},
    description: {type: String},
    tags: {type: [String], required: true, default: []},
    comments: {type: [String], required: true, default: []}
}, {timeStamp: true})

export const Product = model("Product", productSchema)