import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await register(name, email, password);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "fail");
    }
  }
  return (
    <div className="container">
      <div className="card">
        <h1>Create account</h1>
        {err && <div className="error">{err}</div>}
        <form onSubmit={submit} className="stack">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            type="password"
          />
          <button className="btn">Register</button>
        </form>
        <p className="muted">
          If ur a champ and already have an account <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
