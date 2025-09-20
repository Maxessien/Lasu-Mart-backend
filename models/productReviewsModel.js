import { Schema } from "mongoose";

const productReviewSchema = new Schema({
    reviewsId: {type: String, required: true, unique: true},
    userId: {type: String, required: true},
    productId: {type: String, required: true},
    textFeedback: {type: String, required: true},
}, {timeStamp: true})

export const ProductReview = model("Reviews", productReviewSchema)