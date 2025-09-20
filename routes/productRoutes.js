import express from "express"
import { getProducts, getTrendingProducts } from "../controllers/productControllers.js"

const router = express.Router()

router.post("/get_products", getProducts)
router.get("/trending", getTrendingProducts)

export default router