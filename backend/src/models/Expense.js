import mongoose from "mongoose";
//constructing adding expenses
const expenseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    monthKey: { type: String, required: true }, 
    amount: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, trim: true, maxlength: 120 },
    category: {
      type: String,
      required: true,
      enum: ["Food", "Transport", "Bills", "Shopping", "Entertainment", "Health", "Other"]
    },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);
expenseSchema.index({ user: 1, monthKey: 1, date: -1 });
export default mongoose.model("Expense", expenseSchema);
