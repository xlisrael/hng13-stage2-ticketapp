import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, logout as authLogout } from "../utils/auth";
import { clearSession } from "../utils/storage";

export default function Nav() {
  const loc = useLocation();
  const nav = useNavigate();
  const auth = isAuthenticated();

  function handleLogout() {
    authLogout(); // clears session
    clearSession(); // safe
    nav("/auth/login");
  }

  return (
    <header className="site-nav" role="navigation" aria-label="main">
      <div className="container nav-inner">
        <div className="brand">
          <Link to="/" className="brand-link">TicketApp</Link>
        </div>

        <nav className="links" aria-label="main navigation">
          <Link to="/" className={loc.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/dashboard" className={loc.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
          <Link to="/tickets" className={loc.pathname === "/tickets" ? "active" : ""}>Tickets</Link>
        </nav>

        <div className="actions">
          {!auth ? (
            <Link to="/auth/login" className="btn-outline">Login</Link>
          ) : (
            <>
              <button onClick={() => nav("/dashboard")} className="btn">Dashboard</button>
              <button onClick={handleLogout} className="btn-ghost">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
