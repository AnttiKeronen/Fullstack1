import Expense from "../models/Expense.js";

function toMonthKey(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
export async function getExpenses(req, res) {
  const monthKey = req.query.monthKey;
  if (!/^\d{4}-\d{2}$/.test(monthKey || "")) {
    res.status(400);
    throw new Error("Use YYYY-MM");
  }// Fetches all expenses
  const expenses = await Expense.find({ user: req.user.id, monthKey }).sort({ date: -1, createdAt: -1 });
  res.json(expenses);
}
export async function createExpense(req, res) {
  const { amount, description, category, date } = req.body;

  const num = Number(amount);
  if (!Number.isFinite(num) || num <= 0) {
    res.status(400);
    throw new Error("Feed me a number");
  }
  if (!description || !description.trim()) {
    res.status(400);
    throw new Error("I would like to have a description");
  }
  const monthKey = toMonthKey(date);
  if (!monthKey) {
    res.status(400);
    throw new Error("Stop screwing, give me the correct date");
  }

  const expense = await Expense.create({
    user: req.user.id,
    monthKey,
    amount: num,
    description: description.trim(),
    category,
    date: new Date(date)
  });
  res.status(201).json(expense);
}
export async function delExpense(req, res) {
  const exp = await Expense.findById(req.params.id);
  if (!exp) {
    res.status(404);
    throw new Error("not found");
  }
  if (exp.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Nope");
  }
  await exp.deleteOne();
  res.json({ message: "Destroyed" });
}

export async function getSummary(req, res) {
  const monthKey = req.query.monthKey;
  if (!/^\d{4}-\d{2}$/.test(monthKey || "")) {
    res.status(400);
    throw new Error("Use YYYY-MM");
  }
  const agg = await Expense.aggregate([
    { $match: { user: (await Expense.db.model("User").findById(req.user.id))?._id, monthKey } },
    { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
  ]);
  const total = agg?.[0]?.total ?? 0;
  const count = agg?.[0]?.count ?? 0;
  res.json({ monthKey, total, count });
}
