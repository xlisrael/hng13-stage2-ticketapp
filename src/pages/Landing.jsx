import React from "react";
import { Link } from "react-router-dom";
import Wave from "../assets/wave.svg";
import Circle from "../assets/circle.svg";

export default function Landing() {
  return (
    <main className="hero-container">
      <div className="hero-inner container">
        <div className="hero-left">
          <h1>TicketApp — Manage issues, fast.</h1>
          <p className="lead">
            A simple multi-framework ticket management app (React version).
            Create, track and close tickets — with a consistent layout.
          </p>

          <div className="cta-row">
            <Link to="/auth/signup" className="btn">Get Started</Link>
            <Link to="/auth/login" className="btn-outline">Login</Link>
          </div>
        </div>

        <div className="hero-right" aria-hidden="true">
            <img src={Circle} alt="" className="decor-circle decor-1"/>
            <div className="box demo-box">Feature box - quick stats</div>
            </div>
        </div>

      {/* <div className="hero-wave" aria-hidden="true" dangerouslySetInnerHTML={{ __html: Wave }} /> */}
        {/* <img src={Wave} alt="" className="hero-wave" dangerouslySetInnerHTML={Wave}/> */}
        <div className= "hero-wave" aria-hidden="true" style={{ backgroundImage: `url(${Wave})`, backgroundcolor: "red" }}>
            <svg></svg>
        </div>

        <footer className="site-footer">
            <div className="container">
                <p>© {new Date().getFullYear()} TicketApp — Built for HNG Stage 2</p>
            </div>
        </footer>
    </main>
  );
}
