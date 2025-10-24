// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Tickets from './pages/Tickets';
import NotFound from './pages/NotFound';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
// import viteLogo from '/vite.svg'
// import './styles.css'

function App() {

  return (
    <div className="app-root">
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/:mode" element={<Auth />} />
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
