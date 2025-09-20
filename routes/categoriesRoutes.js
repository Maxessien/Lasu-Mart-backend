import express from "express";
import { addCategory, deleteCategory, getCategories } from "../controllers/categoriesControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/get", getCategories)
router.post("/add", authMiddleware("admin"), addCategory)
router.delete("/delete", authMiddleware("admin"), deleteCategory)

export default router