import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { login, signup } from "../utils/auth";

export default function Auth() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const isLogin = mode === "login";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setServerMsg(null);

    // basic validation
    const errs = {};
    if (!isLogin && !form.name.trim()) errs.name = "Full name required";
    if (!form.email.trim()) errs.email = "Email required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Email invalid";
    if (!form.password || form.password.length < 4) errs.password = "Password too short";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      if (isLogin) {
        login({ email: form.email, password: form.password });
      } else {
        signup({ name: form.name, email: form.email, password: form.password });
      }
      navigate("/dashboard");
    } catch (err) {
      setServerMsg(err.message || "Authentication failed");
    }
  }

  return (
    <main className="auth-page container">
      <h1>{isLogin ? "Login" : "Create an account"}</h1>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {!isLogin && (
          <label>
            <span>Full name</span>
            <input name="name" value={form.name} onChange={handleChange} aria-describedby="err-name" />
            <div className="error" id="err-name">{errors.name}</div>
          </label>
        )}

        <label>
          <span>Email</span>
          <input name="email" value={form.email} onChange={handleChange} aria-describedby="err-email" />
          <div className="error" id="err-email">{errors.email}</div>
        </label>

        <label>
          <span>Password</span>
          <input name="password" type="password" value={form.password} onChange={handleChange} aria-describedby="err-pass" />
          <div className="error" id="err-pass">{errors.password}</div>
        </label>

        {serverMsg && <div className="error" role="alert">{serverMsg}</div>}

        <div className="auth-actions">
          <button className="btn" type="submit">{isLogin ? "Login" : "Sign up"}</button>
        </div>
      </form>
    </main>
  );
}
