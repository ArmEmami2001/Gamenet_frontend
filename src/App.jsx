// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CustomerLogin from "./pages/CustomerLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import CustomerSignup from './pages/CustomerSignup'; // <-- Import new page
import EmployeeSignup from './pages/EmployeeSignup'; // <-- Import new page
import CustomerDashboard from "./pages/CustomerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Header from "./components/Header";
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            {/* --- UPDATED ROUTES --- */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login/customer" element={<CustomerLogin />} />
            <Route path="/login/employee" element={<EmployeeLogin />} />
            <Route path="/signup/customer" element={<CustomerSignup />} />
            <Route path="/signup/employee" element={<EmployeeSignup />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
                path="/customer-dashboard" 
                element={
                    <PrivateRoute role="customer">
                        <CustomerDashboard />
                    </PrivateRoute>
                } 
            />
            <Route 
                path="/employee-dashboard" 
                element={
                    <PrivateRoute role="employee">
                        <EmployeeDashboard />
                    </PrivateRoute>
                } 
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;