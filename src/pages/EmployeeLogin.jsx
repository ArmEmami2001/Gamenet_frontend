import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../context/useAuth';
import Spinner from '../components/Spinner';
import './LoginPage.css'; // <-- CORRECTED IMPORT PATH

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
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
            <h2>Employee Login</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username"/>
            </div>
            <div className="input-group">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"/>
            </div>
            <button type="submit" className="login-button" disabled={loading}>ACCESS</button>
            <div className="form-footer">
                Need an account? <Link to="/signup/employee" className="footer-link">Register</Link>
            </div>
            <div className="form-footer">
                <Link to="/" className="footer-link">Back to Main Page</Link>
            </div>
        </form>
    </div>
  );
};

export default EmployeeLogin;