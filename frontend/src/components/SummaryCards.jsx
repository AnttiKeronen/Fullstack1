import React from "react";

function formatisEur(n) {
  if (n == null) return "—";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(n);
}
export default function SummaryCards({ budget, total }) {
  const remaining = budget == null ? null : Math.max(0, budget - total);
  return (
    <div className="grid2">
      <div className="card">
        <div className="label">Spent</div>
        <div className="big">{formatisEur(total)}</div>
        <div className="muted small">Total expenses in selected month</div>
      </div>
      <div className="card">
        <div className="label">Remaining</div>
        <div className="big">{budget == null ? "Set a budget" : formatisEur(remaining)}</div>
        <div className="muted small">
          {budget == null ? "No budget for this month yet" : `Budget: ${formatisEur(budget)}`}
        </div>
      </div>
    </div>
  );
}
