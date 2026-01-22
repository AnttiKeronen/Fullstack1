import React, { useMemo, useState } from "react";

function formatisEur(n) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(n);
}
function formatisDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString();
}
export default function ExpenseList({ expenses, onDelete }) {
  const [filter, setFilter] = useState("All");
  const categories = useMemo(() => {
    const set = new Set(expenses.map((e) => e.category));
    return ["All", ...Array.from(set).sort()];
  }, [expenses]);
  const filtered = useMemo(() => {
    if (filter === "All") return expenses;
    return expenses.filter((e) => e.category === filter);
  }, [expenses, filter]);

  if (!expenses.length) {
    return (
      <div className="card">
        <p className="muted">No expenses yet.</p>
      </div>
    );
  }
  return (
    <div className="card">
      <div className="row space">
        <h2>Expenses</h2>
        <div className="row">
          <div className="label" style={{ marginRight: 8 }}>Filter</div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="list">
        {filtered.map((e) => (
          <div key={e._id} className="expenseRow">
            <div>
              <div className="expenseTop">
                <div className="expenseDesc">{e.description}</div>
                <div className="expenseAmt">{formatisEur(e.amount)}</div>
              </div>
              <div className="muted small">
                {e.category} · {formatisDate(e.date)}
              </div>
            </div>
            <button className="linkDanger" onClick={() => onDelete(e._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
