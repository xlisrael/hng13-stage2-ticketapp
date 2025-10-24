import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    // unauthorized -> redirect to login
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
}
