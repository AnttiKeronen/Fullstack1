import React, { useMemo, useState } from "react";

const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Entertainment", "Health", "Other"];
function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
export default function ExpenseForm({ onCreate }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(todayISO());
  const [loading, setLoading] = useState(false);
  const canSubmit = useMemo(() => {
    const n = Number(amount);
    return Number.isFinite(n) && n > 0 && description.trim().length > 0 && date;
  }, [amount, description, date]);

  async function submit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      await onCreate({
        amount: Number(amount),
        description: description.trim(),
        category,
        date: new Date(date).toISOString()
      });
      setAmount("");
      setDescription("");
      setCategory("Food");
      setDate(todayISO());
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="card" onSubmit={submit}>
      <h2>Add expense</h2>
      <p className="muted">Track spending</p>
      <div className="grid3">
        <div>
          <div className="label">Amount (€)</div>
          <input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="5.50" />
        </div>
        <div>
          <div className="label">Category</div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <div className="label">Date</div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <div className="label">Description</div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="For Example: New Pants"
          maxLength={120}
        />
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn" disabled={!canSubmit || loading}>
          {loading ? "Adding..." : "Add expense"}
        </button>
      </div>
    </form>
  );
}
