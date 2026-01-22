import Budget from "../models/Budget.js";

//source for the date validation
//https://www.geeksforgeeks.org/javascript/how-to-validate-string-date-format-in-javascript/?utm_source=chatgpt.com


// Validates and normalizes the month format
function figureOutMonth(mk) {
  if (!/^\d{4}-\d{2}$/.test(mk)) return null;
  const [y, m] = mk.split("-").map(Number);
  if (m < 1 || m > 12) return null;
  return mk;
}

export async function getBudget(req, res) {
  const monthKey = figureOutMonth(req.query.monthKey);
  if (!monthKey) {
    res.status(400);
    throw new Error("Use YYYY-MM");
  }
  const budget = await Budget.findOne({ user: req.user.id, monthKey });
  res.json({ monthKey, amount: budget?.amount ?? null });
}
export async function upsertBudget(req, res) {
  const monthKey = figureOutMonth(req.body.monthKey);
  const amount = Number(req.body.amount);
  if (!monthKey) {
    res.status(400);
    throw new Error("Use YYYY-MM");
  }
  if (!Number.isFinite(amount) || amount < 0) {
    res.status(400);
    throw new Error("must be a number");
  }// Finds the users budget
  const budget = await Budget.findOneAndUpdate(
    { user: req.user.id, monthKey },
    { $set: { amount } },
    { new: true, upsert: true }
  );
  res.json({ monthKey: budget.monthKey, amount: budget.amount });
}
