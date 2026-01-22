import React from "react";

function toMonthKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
export default function MonthPicker({ monthKey, setMonthKey }) {
  function prev() {
    const [y, m] = monthKey.split("-").map(Number);
    const d = new Date(y, m - 1, 1);
    d.setMonth(d.getMonth() - 1);
    setMonthKey(toMonthKey(d));
  }
  function next() {
    const [y, m] = monthKey.split("-").map(Number);
    const d = new Date(y, m - 1, 1);
    d.setMonth(d.getMonth() + 1);
    setMonthKey(toMonthKey(d));
  }
  return (
    <div className="card row space">
      <div>
        <div className="label">Month</div>
        <div className="big">{monthKey}</div>
      </div>
      <div className="row">
        <button className="btn" onClick={prev}>←</button>
        <button className="btn" onClick={next}>→</button>
      </div>
    </div>
  );
}
