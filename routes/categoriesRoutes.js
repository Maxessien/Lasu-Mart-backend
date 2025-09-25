import express from "express";
import { addCategory, deleteCategory, getCategories } from "../controllers/categoriesControllers.js";

const router = express.Router()

router.get("/get", getCategories)
// router.post("/add", userAuthMiddleware("admin"), addCategory)
// router.delete("/delete", userAuthMiddleware("admin"), deleteCategory)

export default router