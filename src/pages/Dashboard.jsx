import React from "react";
import { getTickets } from "../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const tickets = getTickets();
  const total = tickets.length;
  const open = tickets.filter(t => t.status === "open").length;
  const resolved = tickets.filter(t => t.status === "closed").length;
  const inProgress = tickets.filter(t => t.status === "in_progress").length;
  const nav = useNavigate();

  return (
    <main className="container dashboard-page">
      <h1>Dashboard</h1>

      <div className="stats-grid" role="region" aria-label="ticket summary">
        <div className="stat-card">
          <h3>Total</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h3>Open</h3>
          <p>{open}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{resolved}</p>
        </div>
      </div>

      <div className="dash-actions">
        <button className="btn" onClick={() => nav("/tickets")}>Manage Tickets</button>
      </div>
    </main>
  );
}
