// storage.js
const TICKETS_KEY = "ticketapp_tickets_v1";
const SESSION_KEY = "ticketapp_session";

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}
export function setSession(sessionObj) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// tickets storage
export function getTickets() {
  const raw = localStorage.getItem(TICKETS_KEY);
  return raw ? JSON.parse(raw) : [];
}
export function saveTickets(tickets) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}
export function createTicket(ticket) {
  const tickets = getTickets();
  ticket.id = Date.now().toString();
  tickets.unshift(ticket);
  saveTickets(tickets);
  return ticket;
}
export function updateTicket(id, changes) {
  const tickets = getTickets();
  const idx = tickets.findIndex(t => t.id === id);
  if (idx === -1) throw new Error("Ticket not found");
  tickets[idx] = { ...tickets[idx], ...changes };
  saveTickets(tickets);
  return tickets[idx];
}
export function deleteTicket(id) {
  let tickets = getTickets();
  tickets = tickets.filter(t => t.id !== id);
  saveTickets(tickets);
}
