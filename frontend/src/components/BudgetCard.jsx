import React, { useState } from "react";

export default function BudgetCard({ currentBudget, onSave }) {
  const [amount, setAmount] = useState(currentBudget ?? "");
  const [saving, setSaving] = useState(false);
  React.useEffect(() => {
    setAmount(currentBudget ?? "");
  }, [currentBudget]);
  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(amount);
    } finally {
      setSaving(false);
    }
  }
  return (
    <form className="card" onSubmit={submit}>
      <div className="row space">
        <div>
          <h2>Monthly budget</h2>
          <p className="muted">Set your budget for this month</p>
        </div>
      </div>
      <div className="row">
        <input
          inputMode="decimal"
          placeholder="e.g. 800"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
