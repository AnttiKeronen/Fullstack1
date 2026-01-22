import express from "express";
import { RekisteriinUser, loginUser, getMe } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.post("/register", asyncHandler(RekisteriinUser));
router.post("/login", asyncHandler(loginUser));
router.get("/me", protect, asyncHandler(getMe));
export default router;
