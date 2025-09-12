import express from "express";
import {
  createUser,
  deleteUserProfilePhoto,
  updateUser,
  uploadUserProfilePhoto,
} from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../utils/usersUtilFns.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/update", authMiddleware, updateUser);
router.post("/uploads", authMiddleware, upload.single("profilePhoto"), uploadUserProfilePhoto);
router.get("/uploads/delete", authMiddleware, deleteUserProfilePhoto);

export default router;