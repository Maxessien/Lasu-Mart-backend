import express from "express";
import {
  createUser,
  deleteUserProfilePhoto,
  getUser,
  updateUser,
  uploadUserProfilePhoto,
} from "../controllers/userControllers.js";
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js";
import { upload } from "../utils/usersUtilFns.js";
import { addToCart, deleteFromCart } from "../controllers/userCartControllers.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/get", userAuthMiddleware, getUser)
router.post("/update", userAuthMiddleware, updateUser); 
router.post("/uploads", userAuthMiddleware, upload.single("profilePhoto"), uploadUserProfilePhoto);
router.get("/uploads/delete", userAuthMiddleware, deleteUserProfilePhoto);
router.post("/cart/add", userAuthMiddleware, addToCart)
router.delete("/cart/remove", userAuthMiddleware, deleteFromCart)

export default router;