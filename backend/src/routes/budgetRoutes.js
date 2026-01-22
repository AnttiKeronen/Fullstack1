import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getBudget, upsertBudget } from "../controllers/budgetController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.use(protect);
router.get("/", asyncHandler(getBudget));
router.put("/", asyncHandler(upsertBudget));
export default router;
