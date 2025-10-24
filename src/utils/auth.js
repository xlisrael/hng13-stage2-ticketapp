// auth.js - very small mock auth using localStorage session key name: ticketapp_session
import { getSession, setSession, clearSession } from "./storage";

const EXAMPLE_USER = { id: "user-1", name: "Excel Israel", email: "excel@example.com" };

export function isAuthenticated() {
  return Boolean(getSession());
}

export function login({ email, password }) {
  // mock validation; password can be anything with length >= 4
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.code = "VALIDATION";
    throw err;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const err = new Error("Invalid email format");
    err.code = "VALIDATION";
    throw err;
  }
  if (password.length < 4) {
    const err = new Error("Invalid credentials");
    err.code = "AUTH";
    throw err;
  }
  // success: save session token
  const token = Math.random().toString(36).slice(2);
  const session = { token, user: { ...EXAMPLE_USER, email } , createdAt: Date.now() };
  setSession(session);
  return session;
}

export function signup({ name, email, password }) {
  if (!name || !email || !password) {
    const err = new Error("All fields are required");
    err.code = "VALIDATION";
    throw err;
  }
  // for demo, we accept signup and set session
  const token = Math.random().toString(36).slice(2);
  const session = { token, user: { id: "user-2", name, email }, createdAt: Date.now() };
  setSession(session);
  return session;
}

export function logout() {
  clearSession();
}
