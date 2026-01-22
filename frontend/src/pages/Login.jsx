import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Login failed");
    }
  }
  return (
    <div className="container">
      <div className="card">
        <h1>Login</h1>
        {err && <div className="error">{err}</div>}
        <form onSubmit={submit} className="stack">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <button className="btn">Login</button>
        </form>
        <p className="muted">
          Make an account ASAP! <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
