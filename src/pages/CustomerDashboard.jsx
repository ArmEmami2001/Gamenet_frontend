import React, { useState, useEffect } from 'react';
import useAuth from '../context/useAuth';
import authService from '../services/authService';
import Spinner from '../components/Spinner';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await authService.getCustomerProfile();
                setProfile(data);
            } catch (err) {
                setError('Failed to load profile data.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <Spinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Customer Dashboard</h1>
                <p>Welcome, <span className="username">{user?.username || 'Customer'}</span></p>
            </div>
            {profile ? (
                <div className="profile-card">
                    <h2>Subscription Status</h2>
                    <div className="profile-info">
                        <p><strong>Subscription End Date:</strong> {profile.subs || 'N/A'}</p>
                         <p className={`days-remaining ${profile.days_remaining <= 0 ? 'expired' : ''}`}>
                            <strong>Days Remaining:</strong> {profile.days_remaining > 0 ? profile.days_remaining : 'Expired'}
                         </p>
                    </div>
                </div>
            ) : (
                <p>No profile information available.</p>
            )}
        </div>
    );
};

export default CustomerDashboard;