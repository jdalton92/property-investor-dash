import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./styles/Footer.css";

const Footer = () => {
  const handleGitHubClick = e => {
    e.preventDefault();
    const win = window.open(
      "https://github.com/jdalton92/property-investor-dash",
      "_blank"
    );
    if (win != null) {
      win.focus();
    }
  };

  return (
    <>
      <footer className="footer-section">
        <div className="footer-row footer-info">
          <div className="footer-container">
            <h2 className="footer-heading">Calculators</h2>
            <ul className="footer-links">
              <li>
                <Link className="footer-link" to="/owner-occupier">
                  Owner Occupier
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/investor">
                  Investor
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/developer">
                  Developer
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-container">
            <h2 className="footer-heading">Company</h2>
            <ul className="footer-links">
              <li>
                <Link className="footer-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-container">
            <h2 className="footer-heading">User</h2>
            <ul className="footer-links">
              <li>
                <Link className="footer-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/create-user">
                  Create Account
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/saved-dashboards">
                  Saved Dashboards
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-row footer-icons">
          <div
            alt="GitHub"
            title="GitHub"
            onClick={handleGitHubClick}
            className="github-icon"
          />
        </div>
        <div className="footer-row footer-copyright">
          © Copyright 2020 PropertyInvestorDASH
        </div>
      </footer>
    </>
  );
};

export default connect(null, null)(Footer);
