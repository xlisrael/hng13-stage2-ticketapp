import React from "react";

const STATUS_COLORS = {
  open: "var(--status-open)",
  in_progress: "var(--status-progress)",
  closed: "var(--status-closed)"
};

export default function TicketCard({ ticket, onEdit, onDelete }) {
  return (
    <article className="ticket-card" aria-labelledby={`t-${ticket.id}`}>
      <div className="ticket-top">
        <h3 id={`t-${ticket.id}`}>{ticket.title}</h3>
        <span className="status-pill" style={{ background: STATUS_COLORS[ticket.status] }}>
          {ticket.status.replace("_", " ")}
        </span>
      </div>
      <p className="ticket-desc">{ticket.description}</p>
      <div className="ticket-meta">
        <small>Priority: {ticket.priority || "normal"}</small>
        <div className="ticket-actions">
          <button className="btn-sm" onClick={() => onEdit(ticket)}>Edit</button>
          <button className="btn-sm danger" onClick={() => onDelete(ticket.id)}>Delete</button>
        </div>
      </div>
    </article>
  );
}
