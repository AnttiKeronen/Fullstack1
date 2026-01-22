import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getExpenses,
  createExpense,
  delExpense,
  getSummary
} from "../controllers/expenseController.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();
router.use(protect);
router.get("/", asyncHandler(getExpenses));
router.get("/summary", asyncHandler(getSummary));
router.post("/", asyncHandler(createExpense));
router.delete("/:id", asyncHandler(delExpense));
export default router;
