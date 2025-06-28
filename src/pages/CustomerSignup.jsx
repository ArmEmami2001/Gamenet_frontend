import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import Spinner from '../components/Spinner';
import './SignupPage.css'; // <-- CORRECTED IMPORT PATH

const CustomerSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.registerCustomer(username, password);
      navigate('/login/customer', { state: { message: 'Signup successful! Please log in.' } });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {loading && <Spinner />}
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Customer Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username"/>
        </div>
        <div className="input-group">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"/>
        </div>
        <button type="submit" className="signup-button" disabled={loading}>Create Account</button>
        <div className="form-footer">
          Already have an account? <Link to="/login/customer" className="footer-link">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default CustomerSignup;