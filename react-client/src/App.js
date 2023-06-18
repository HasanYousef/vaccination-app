import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import SummaryPage from "./components/SummaryPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              COVID-19 Vaccination Registration
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Registration Form
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/summary" className="nav-link">
                    Summary Page
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
