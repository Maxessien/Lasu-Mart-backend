import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./configs/mongoDBConfig.js";
import { Product } from "./models/productsModel.js";
import { test } from "./test.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: true,
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
      price: test.price,
      discountPercentage: test.discountPercentage,
      imageUrl: test.images[0],
      productId: test.id,
      category: test.category,
      productReviews: test.reviews,
      vendorId: test.id,
      description: test.description,
      tags: test.tags,
      ratings: test.rating,
      comments: test.reviews[0].comment,
    });
  });
  console.log(newArray)
  const dbStore = await Product.insertMany(newArray);
  console.log(dbStore);
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
