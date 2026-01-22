import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <div className="nav">
      <Link className="brand" to="/">BudgetThing</Link>
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        ) : (
          <>
            <span className="muted">Hi, {user.name}</span>
            <button
              className="btn"
              onClick={() => {
                logout();
                nav("/login");
              }}
            >
              Get Out!
            </button>
          </>
        )}
      </div>
    </div>
  );
}
