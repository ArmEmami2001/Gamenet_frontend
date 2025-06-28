import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../context/useAuth';
import Spinner from '../components/Spinner';
import './LoginPage.css'; // <-- CORRECTED IMPORT PATH

const CustomerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    try {
      await loginUser(username, password);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="login-container">
        {loading && <Spinner />}
        <form onSubmit={handleSubmit} className="login-form">
            <h2>Customer Login</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username"/>
            </div>
            <div className="input-group">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"/>
            </div>
            <button type="submit" className="login-button" disabled={loading}>ACCESS</button>
            <div className="form-footer">
                Don't have an account? <Link to="/signup/customer" className="footer-link">Sign Up</Link>
            </div>
             <div className="form-footer">
                <Link to="/" className="footer-link">Back to Main Page</Link>
            </div>
        </form>
    </div>
  );
};

export default CustomerLogin;