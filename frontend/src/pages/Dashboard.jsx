import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios.js";

import MonthPicker from "../components/MonthPicker.jsx";
import BudgetCard from "../components/BudgetCard.jsx";
import SummaryCards from "../components/SummaryCards.jsx";
import ExpenseForm from "../components/ExpenseForm.jsx";
import ExpenseList from "../components/ExpenseList.jsx";

function currentMonthKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
export default function Dashboard() {
  const [monthKey, setMonthKey] = useState(currentMonthKey());
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [err, setErr] = useState("");
  const total = useMemo(() => expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0), [expenses]);
  async function loadAll() {
    setErr("");
    try {
      const [b, e] = await Promise.all([
        api.get("/api/budget", { params: { monthKey } }),
        api.get("/api/expenses", { params: { monthKey } })
      ]);
      setBudget(b.data.amount);
      setExpenses(e.data);
    } catch (ex) {
      setErr(ex?.response?.data?.message || "Failed to load");
    }
  } 
  // Loads budget and expenses whenever the selected month changes
  useEffect(() => {
    loadAll();
  }, [monthKey]);
  async function saveBudget(amountInput) {
    const amount = Number(amountInput);
    if (!Number.isFinite(amount) || amount < 0) {
      setErr("Give me a nmber");
      return;
    }
    setErr("");
    const res = await api.put("/api/budget", { monthKey, amount });
    setBudget(res.data.amount);
  }
  async function createExpense(payload) {
    setErr("");
    const res = await api.post("/api/expenses", payload);
    if (res.data.monthKey === monthKey) setExpenses((prev) => [res.data, ...prev]);
  }
  async function delExpense(id) {
    setErr("");
    await api.delete(`/api/expenses/${id}`);
    setExpenses((prev) => prev.filter((x) => x._id !== id));
  }
  return (
    <div className="container">
      <div className="header">
        <h1>Monthly Expenses</h1>
        <p className="muted">Start you budgeting journey</p>
      </div>
      {err && <div className="error">{err}</div>}
      <MonthPicker monthKey={monthKey} setMonthKey={setMonthKey} />
      <SummaryCards budget={budget} total={total} />
      <BudgetCard currentBudget={budget} onSave={saveBudget} />
      <ExpenseForm onCreate={createExpense} />
      <ExpenseList expenses={expenses} onDelete={delExpense} />
    </div>
  );
}
