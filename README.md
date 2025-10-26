# HNG Stage 2 Ticket Management App (React)

A fully functional **Ticket Management Web Application** built with **React (Vite)**, **CSS**, and **LocalStorage**.  
This project is part of the **HNG 13 Frontend Stage 2 Task**, focusing on multi-framework implementation consistency, authentication, CRUD functionality, and responsive UI design.

---

## Overview
This application enables users to:
- **Sign up** and **log in** (authentication simulated using LocalStorage)
- **Create, read, update, and delete (CRUD)** support tickets
- View ticket statistics in a clean **dashboard**
- Navigate across pages (Home, Dashboard, Tickets) with **protected routes**
- Enjoy a responsive, accessible, and visually consistent design

---

## Features
### Landing Page
- Hero section with a **wavy SVG background**
- **"Login"** and **"Get Started"** buttons leading to authentication
- Decorative circles and card-style feature boxes
- Fully responsive (max-width: 1440px, centered layout)

### Authentication
- **Login and Signup** pages with validation
- Inline error messages and toast notifications for feedback
- On success → user session stored as `ticketapp_session` in LocalStorage
- Invalid sessions auto-redirect to the login page

### Dashboard
- Displays key stats:
  - Total tickets
  - Open tickets
  - Resolved tickets
- Navigation links to the Ticket Management screen
- Logout clears the session and redirects to the landing page

### Ticket Management (CRUD)
- Create, edit, delete, and view tickets
- Fields: title, description, and status (`open`, `in_progress`, `closed`)
- Inline and toast validation feedback
- Color-coded status tags:
  -  Open
  -  In Progress
  -  Closed

---

## Technologies Used
- **React 18 (Vite)**
- **React Router DOM**
- **Vanilla CSS**
- **LocalStorage API**
- **Toast notifications (custom)**

---

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xlisrael/hng13-stage2-ticketapp.git
   cd hng13-stage2-ticketapp
   npm run dev
