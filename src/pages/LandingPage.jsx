import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1>Welcome to GameNet</h1>
      <h2>Select Your Portal</h2>
      <div className="portal-selection">
        <Link to="/login/customer" className="portal-link">
          Customer Portal
        </Link>
        <Link to="/login/employee" className="portal-link">
          Employee Portal
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;