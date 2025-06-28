import React, { useState, useEffect } from 'react';
import useAuth from '../context/useAuth';
import authService from '../services/authService';
import Spinner from '../components/Spinner';
import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editStates, setEditStates] = useState({});
    const [message, setMessage] = useState({ text: '', type: ''});
    const { user } = useAuth();

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const data = await authService.getAllCustomers();
            setCustomers(data);
        } catch (err) {
            setError('Failed to load customer data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDateChange = (id, date) => {
        setEditStates(prev => ({ ...prev, [id]: date }));
    };

    const handleUpdateSub = async (id) => {
        const newDate = editStates[id];
        if (!newDate) return;
        
        try {
            await authService.updateCustomerSub(id, newDate);
            setMessage({ text: 'Subscription updated successfully!', type: 'success'});
            fetchCustomers(); // Refresh data
        } catch(err) {
            setMessage({ text: 'Failed to update subscription.', type: 'error'});
            console.error(err);
        } finally {
            setTimeout(() => setMessage({ text: '', type: ''}), 3000);
        }
    };
    
    if (loading) return <Spinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Employee Control Panel</h1>
                <p>Logged in as: {user?.username || 'Employee'}</p>
            </div>
            {message.text && <div className={`message-box ${message.type}`}>{message.text}</div>}
            <div className="customers-list">
                <h2>Manage Customer Subscriptions</h2>
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Sub End Date</th>
                            <th>Days Left</th>
                            <th>Update Subscription</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.username}</td>
                                <td>{customer.subs}</td>
                                <td>{customer.days_remaining}</td>
                                <td className="action-cell">
                                    <input 
                                        type="date"
                                        onChange={(e) => handleDateChange(customer.id, e.target.value)}
                                    />
                                    <button onClick={() => handleUpdateSub(customer.id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDashboard;