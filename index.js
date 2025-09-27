import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./configs/mongoDBConfig.js";
import { Product } from "./models/productsModel.js";
import { test } from "./test.js";
import mongoose from "mongoose";
import { User } from "./models/usersModel.js";
import { auth } from "./configs/fbConfigs.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

const newTest = test.products;

//express routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", categoriesRoutes);

const PORT = process.env.PORT || 3000;

//connect to mongoose db
connectDB();

try {
  let newArray = [];
  newTest.forEach((test) => {
    newArray.push({
      name: test.title,
      price: Number(test.price),
      discountPrice: test.price-(Number(test.discountPercentage/100)*Number(test.price)),
      imageUrl: test.images[0],
      productId: test.id * Math.random()*10,
      category: test.category,
      productReviews: test.reviews,
      vendorId: test.id * Math.random()*10,
      description: test.description,
      tags: test.tags,
      ratings: test.rating,
      comments: test.reviews[0].comment,
    });
  });
  const dbStore = await Product.insertMany(newArray);
  const count = await Product.countDocuments()
  const user = await auth.getUserByEmail("essienmax484@gmail.com")
  await auth.deleteUser(user.uid)
  console.log(count)
  console.log(dbStore[0].createdAt, "hello");
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
