import React, { useEffect, useState } from "react";
import { getTickets, createTicket, updateTicket, deleteTicket } from "../utils/storage";
import TicketCard from "../components/TicketCard";

const STATUS_VALUES = ["open", "in_progress", "closed"];

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", status: "open", priority: "normal" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setTickets(getTickets());
  }, []);

  function resetForm() {
    setForm({ title: "", description: "", status: "open", priority: "normal" });
    setEditing(null);
    setErrors({});
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!STATUS_VALUES.includes(form.status)) e.status = "Invalid status";
    if (form.description && form.description.length > 1000) e.description = "Description too long";
    if (form.description && form.description.length < 10) e.description = "Description must be at least 10 characters";
    return e;
  }

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    try {
      if (editing) {
        updateTicket(editing.id, form);
        setMessage({ type: "success", text: "Ticket updated" });
      } else {
        createTicket(form);
        setMessage({ type: "success", text: "Ticket created" });
      }
      setTickets(getTickets());
      resetForm();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to save" });
    }
  }

  function handleEdit(ticket) {
    setEditing(ticket);
    setForm({ title: ticket.title, description: ticket.description || "", status: ticket.status, priority: ticket.priority || "normal" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (!confirm("Delete this ticket?")) return;
    try {
      deleteTicket(id);
      setTickets(getTickets());
      setMessage({ type: "success", text: "Ticket deleted" });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete" });
    }
  }

  return (
    <main className="container tickets-page">
      <h1>Ticket Management</h1>

      <form className="ticket-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label>
            <span>Title</span>
            <input name="title" value={form.title} onChange={handleChange} aria-describedby="err-title" />
            <div className="error" id="err-title">{errors.title}</div>
          </label>

          <label>
            <span>Status</span>
            <select name="status" value={form.status} onChange={handleChange} aria-describedby="err-status">
              {STATUS_VALUES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="error" id="err-status">{errors.status}</div>
          </label>
        </div>

        <label>
          <span>Priority</span>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">low</option>
            <option value="normal">normal</option>
            <option value="high">high</option>
          </select>
        </label>

        <label>
          <span>Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} aria-describedby="err-desc" />
          <div className="error" id="err-desc">{errors.description}</div>
        </label>

        <div className="form-actions">
          <button className="btn" type="submit">{editing ? "Update Ticket" : "Create Ticket"}</button>
          <button type="button" className="btn-ghost" onClick={resetForm}>Reset</button>
        </div>
      </form>

      {message && <div className={`msg ${message.type}`}>{message.text}</div>}

      <section className="tickets-list" aria-live="polite">
        {tickets.length === 0 ? <p>No tickets yet — create one above.</p> : (
          tickets.map(t => (
            <TicketCard key={t.id} ticket={t} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </section>
    </main>
  );
}
