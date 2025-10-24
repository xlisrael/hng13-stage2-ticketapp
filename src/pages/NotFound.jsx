import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="container notfound-page">
      <h1>404 — Page not found</h1>
      <p>Sorry, we couldn't find that page.</p>
      <Link to="/">Return Home</Link>
    </main>
  );
}
