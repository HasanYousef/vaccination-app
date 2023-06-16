import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import SummaryPage from "./components/SummaryPage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>COVID-19 Vaccination Registration</h1>
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/">Registration Form</Link>
            </li>
            <li>
              <Link to="/summary">Summary Page</Link>
            </li>
          </ul>
        </nav>
        <main>
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
