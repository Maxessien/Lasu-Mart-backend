import { Schema } from "mongoose";

const productReviewSchema = new Schema({
    reviewsId: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    productId: {type: String, required: true},
    textFeedback: {type: String, required: true},
    ratings: {type: Number, required: true, min: 1, max: 5},
}, {timeStamp: true})

export const ProductReview = model("Reviews", productReviewSchema)