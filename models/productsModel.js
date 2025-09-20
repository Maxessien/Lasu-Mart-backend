import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true },
    productId: { type: String, required: true },
    category: { type: Array, required: true },
    productReviews: { type: Array, required: true, default: [] },
    vendorId: { type: String, required: true },
    description: { type: String },
    tags: { type: [String], required: true, default: [] },
    ratings: { type: Number, required: true, min: 1, max: 5 },
    comments: { type: [String], required: true, default: [] },
    vectorRepresentation: { type: [Number], required: true, default: [] },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
