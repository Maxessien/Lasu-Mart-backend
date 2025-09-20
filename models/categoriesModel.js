import { model } from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {type: String, required: true},
}, {timeStamp: true})

export const Category = model("Category", categorySchema)