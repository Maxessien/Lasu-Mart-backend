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

const router = express.Router();

router.post("/register", createUser);
router.get("/get", userAuthMiddleware, getUser)
router.post("/update/:dbOnly", userAuthMiddleware, updateUser); 
router.post("/uploads", userAuthMiddleware, upload.single("profilePhoto"), uploadUserProfilePhoto);
router.get("/uploads/delete", userAuthMiddleware, deleteUserProfilePhoto);

export default router;