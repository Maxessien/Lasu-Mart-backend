import { model } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    displayName: { type: String, required: true },
    userId: { type: String, required: true },
    profilePicture: {
      url: { type: String, required: true, default: "default" },
      publicId: { type: String, required: true, default: "default" },
    },
    email: { type: String },
    phoneNumber: { type: String },
    cart: {
      type: [
        {
          name: { type: String, required: true },
          price: {type: Number, required: true},
          imageUrl: {type: String, required: true},
          variant: String,
          quantity: { type: Number, default: 1 },
        },
      ],
      required: true,
      default: [],
    },
    recentOrders: { type: Array, default: [] },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "vendor"],
      default: "user",
    },
    following: { type: Array, required: true, default: [] },
    wishlist: { type: Array, required: true, default: [] },
    reviewsMade: { type: Array, required: true, default: [] },
    orderPoints: { type: Number, required: true, default: 0 },
  },
  { timeStamp: true }
);

export const User = model("User", userSchema);
