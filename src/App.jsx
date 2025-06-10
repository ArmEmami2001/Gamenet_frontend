import React, { useState, useEffect, useCallback } from 'react';

// --- Self-Contained CSS Styles ---
// This component injects all necessary styles directly into the document head.
// This avoids the need for a separate CSS file or a complex Tailwind setup.
function AppStyles() {
  return (
    <style>{`
      :root {
        --blue-50: #eff6ff;
        --blue-600: #2563eb;
        --blue-700: #1d4ed8;
        --blue-800: #1e40af;
        --gray-50: #f9fafb;
        --gray-100: #f3f4f6;
        --gray-200: #e5e7eb;
        --gray-300: #d1d5db;
        --gray-400: #9ca3af;
        --gray-500: #6b7280;
        --gray-600: #4b5563;
        --gray-700: #374151;
        --gray-800: #1f2937;
        --gray-900: #111827;
        --green-100: #dcfce7;
        --green-400: #4ade80;
        --green-600: #16a34a;
        --green-700: #15803d;
        --red-100: #fee2e2;
        --red-400: #f87171;
        --red-600: #dc2626;
        --red-700: #b91c1c;
        --white: #ffffff;
      }

      body {
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        color: var(--gray-800);
        margin: 0;
        background-color: var(--gray-50);
      }
      .container { width: 100%; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem; }
      @media (min-width: 640px) { .container { max-width: 640px; padding-left: 1.5rem; padding-right: 1.5rem; } }
      @media (min-width: 768px) { .container { max-width: 768px; } }
      @media (min-width: 1024px) { .container { max-width: 1024px; padding-left: 2rem; padding-right: 2rem; } }
      @media (min-width: 1280px) { .container { max-width: 1280px; } }
      @media (min-width: 1536px) { .container { max-width: 1536px; } }

      .bg-gray-50 { background-color: var(--gray-50); }
      .min-h-screen { min-height: 100vh; }
      .font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; }
      .bg-white { background-color: var(--white); }
      .shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
      .flex { display: flex; }
      .items-center { align-items: center; }
      .justify-between { justify-content: space-between; }
      .text-2xl { font-size: 1.5rem; line-height: 2rem; }
      .font-bold { font-weight: 700; }
      .text-blue-600 { color: var(--blue-600); }
      .space-x-2 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.5rem; }
      .space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: 1rem; }
      .rounded-lg { border-radius: 0.5rem; }
      .bg-gray-200 { background-color: var(--gray-200); }
      .p-1 { padding: 0.25rem; }
      .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
      .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
      .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
      .text-base { font-size: 1rem; line-height: 1.5rem; }
      .font-medium { font-weight: 500; }
      .rounded-md { border-radius: 0.375rem; }
      .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 300ms; }
      .duration-300 { transition-duration: 300ms; }
      .text-gray-600 { color: var(--gray-600); }
      .hover\\:bg-gray-300:hover { background-color: var(--gray-300); }
      .shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
      .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
      .max-w-4xl { max-width: 56rem; }
      .text-center { text-align: center; }
      .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
      .text-gray-500 { color: var(--gray-500); }
      .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1); }
      .rounded-xl { border-radius: 0.75rem; }
      .p-6 { padding: 1.5rem; }
      .border { border-width: 1px; }
      .border-gray-200 { border-color: var(--gray-200); }
      .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
      .text-gray-900 { color: var(--gray-900); }
      .mb-6 { margin-bottom: 1.5rem; }
      .grid { display: grid; }
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .gap-8 { gap: 2rem; }
      .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
      .text-gray-800 { color: var(--gray-800); }
      .mb-4 { margin-bottom: 1.5rem; }
      .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
      .p-3 { padding: 0.75rem; }
      .rounded-lg { border-radius: 0.5rem; }
      .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.1); }
      .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem; }
      .my-6 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
      .mt-8 { margin-top: 2rem; }
      .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
      .block { display: block; }
      .mb-1 { margin-bottom: 0.25rem; }
      .text-gray-700 { color: var(--gray-700); }
      .w-full { width: 100%; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
      .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
      .bg-gray-100 { background-color: var(--gray-100); }
      .border-gray-300 { border-color: var(--gray-300); }
      .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
      .focus\\:ring-2:focus { box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); }
      .focus\\:ring-blue-500:focus { --tw-ring-color: var(--blue-600); }
      .focus\\:border-transparent:focus { border-color: transparent; }
      .text-white { color: var(--white); }
      .bg-blue-600 { background-color: var(--blue-600); }
      .hover\\:bg-blue-700:hover { background-color: var(--blue-700); }
      .focus\\:ring-offset-2:focus { --tw-ring-offset-width: 2px; }
      .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
      .duration-200 { transition-duration: 200ms; }
      .ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
      .disabled\\:bg-gray-400:disabled { background-color: var(--gray-400); }
      .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
      .flex-col { flex-direction: column; }
      .gap-3 { gap: 0.75rem; }
      .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
      .flex-grow { flex-grow: 1; }
      .bg-blue-50 { background-color: var(--blue-50); }
      .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
      .text-blue-800 { color: var(--blue-800); }
      .mt-2 { margin-top: 0.5rem; }
      .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
      .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
      .mt-4 { margin-top: 1rem; }
      .text-green-600 { color: var(--green-600); }
      .text-red-600 { color: var(--red-600); }
      .border-green-400 { border-color: var(--green-400); }
      .bg-green-100 { background-color: var(--green-100); }
      .text-green-700 { color: var(--green-700); }
      .border-red-400 { border-color: var(--red-400); }
      .bg-red-100 { background-color: var(--red-100); }
      .text-red-700 { color: var(--red-700); }
      .relative { position: relative; }
      @media (min-width: 640px) {
        .sm\\:p-8 { padding: 2rem; }
        .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .sm\\:py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .sm\\:flex-row { flex-direction: row; }
        .sm\\:w-auto { width: auto; }
        .sm\\:inline { display: inline; }
        .sm\\:text-base { font-size: 1rem; line-height: 1.5rem; }
      }
      @media (min-width: 768px) {
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (min-width: 1024px) {
        .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .animate-spin { animation: spin 1s linear infinite; }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .border-dashed { border-style: dashed; }
      .border-4 { border-width: 4px; }
      .border-blue-500 { border-color: var(--blue-600); }
      .rounded-full { border-radius: 9999px; }
      .h-8 { height: 2rem; }
      .w-8 { width: 2rem; }
    `}</style>
  );
}


// --- Configuration ---
const API_BASE_URL = 'http://127.0.0.1:8001/api';

// --- Helper Components ---

const Card = ({ children, className }) => (
    <div className={`bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 ${className}`}>
        {children}
    </div>
);

const Button = ({ children, onClick, className = '', type = 'button', disabled = false }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
        {children}
    </button>
);

const Input = ({ id, type = 'text', value, onChange, placeholder, className = '' }) => (
    <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${className}`}
    />
);

const Select = ({ id, value, onChange, children, className = '' }) => (
     <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${className}`}
    >
        {children}
    </select>
);


const Spinner = () => (
    <div className="flex justify-center items-center p-4">
        <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
);

const Alert = ({ message, type = 'success', details }) => {
    if (!message) return null;
    const colors = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
    };
    return (
        <div className={`border px-4 py-3 rounded-lg relative ${colors[type]}`}>
            <span className="block sm:inline font-semibold">{message}</span>
            {details && <p className="text-sm mt-1">{details}</p>}
        </div>
    );
};


// --- API Service ---
const apiService = {
    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ detail: `HTTP ${response.status} Error` }));
                throw new Error(errorData.detail || `An unknown error occurred on the server.`);
            }
            return response.json();
        } catch (error) {
            console.error(`API GET Error (${endpoint}):`, error);
            throw new Error(`Network error or server is down. Is the backend at ${API_BASE_URL} running?`);
        }
    },
    post: async (endpoint, data) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
               const errorData = await response.json().catch(() => ({ detail: `HTTP ${response.status} Error` }));
               throw new Error(errorData.detail || `An unknown error occurred on the server.`);
            }
            return response.json();
        } catch(error) {
            console.error(`API POST Error (${endpoint}):`, error);
            throw new Error(`Network error or server is down. Is the backend at ${API_BASE_URL} running?`);
        }
    },
};


// --- Main Feature Components ---

function CreateCustomerForm({ onCustomerCreated }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !password) {
            setError({ message: 'Please fill in both name and password.'});
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess('');
        try {
            const newCustomer = await apiService.post('/worker/create-customer', { name, password });
            setSuccess(`Successfully created customer: ${newCustomer.name} (ID: ${newCustomer.id})`);
            setName('');
            setPassword('');
            if (onCustomerCreated) {
                onCustomerCreated();
            }
        } catch (err) {
            setError({ message: 'Failed to create customer.', details: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Create New Customer</h3>
             <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., John Doe" />
            </div>
             <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a secure password" />
            </div>
            {error && <Alert message={error.message} details={error.details} type="error" />}
            {success && <Alert message={success} type="success" />}
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : 'Create Customer'}
            </Button>
        </form>
    );
}

function AddSubscriptionForm({ customers, onSubscriptionAdded }) {
    const [selectedCustomerId, setSelectedCustomerId] = useState('');
    // Default to a date 30 days from now, formatted as YYYY-MM-DD
    const getFutureDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 30);
        return date.toISOString().split('T')[0];
    };
    const [subTime, setSubTime] = useState(getFutureDate());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    
    useEffect(() => {
        if (customers.length > 0 && !selectedCustomerId) {
            setSelectedCustomerId(customers[0].id);
        }
    }, [customers, selectedCustomerId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCustomerId) {
            setError({ message: 'Please select a customer.' });
            return;
        }
        setLoading(true);
        setError(null);
        setSuccess('');
        try {
            // Send the selected date string directly to the backend
            const payload = { subtime: subTime };
            const updatedCustomer = await apiService.post(`/worker/addsub/${selectedCustomerId}`, payload);
            setSuccess(`Successfully set subscription for customer ID: ${updatedCustomer.id}.`);
            if (onSubscriptionAdded) {
                onSubscriptionAdded();
            }
        } catch (err) {
            setError({ message: 'Failed to add subscription.', details: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Add/Update Subscription</h3>
            <div>
                <label htmlFor="customer-select" className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
                <Select id="customer-select" value={selectedCustomerId} onChange={(e) => setSelectedCustomerId(e.target.value)}>
                    <option value="" disabled>-- Select a customer --</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name} (ID: {c.id})</option>)}
                </Select>
            </div>
             <div>
                <label htmlFor="sub-time" className="block text-sm font-medium text-gray-700 mb-1">Set Expiration Date</label>
                <Input id="sub-time" type="date" value={subTime} onChange={(e) => setSubTime(e.target.value)} />
            </div>
            {error && <Alert message={error.message} details={error.details} type="error" />}
            {success && <Alert message={success} type="success" />}
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner /> : 'Set Subscription'}
            </Button>
        </form>
    );
}


function WorkerPanel() {
    const [customers, setCustomers] = useState([]);
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [workersData, customersData] = await Promise.all([
                apiService.get('/worker'),
                apiService.get('/worker/addsub')
            ]);
            setWorkers(workersData);
            setCustomers(customersData);
        } catch (err) {
            setError({ message: 'A backend error occurred.', details: err.message });
            console.error("Detailed Error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) return <Spinner />;

    return (
        <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Worker Dashboard</h2>
            {error && <Alert message={error.message} type="error" details={`${error.details} Please ensure your Django backend is running and the controller logic is correct.`} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Active Workers</h3>
                    {workers.length > 0 ? (
                        <ul className="space-y-2">
                            {workers.map(worker => (
                                <li key={worker.id} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                                    <span className="font-medium">{worker.name}</span> - Shift: {worker.worktime}
                                </li>
                            ))}
                        </ul>
                    ) : ( <p>No workers found.</p> )}
                </div>
                <div className="space-y-6">
                    <CreateCustomerForm onCustomerCreated={fetchData} />
                    <hr className="my-6" style={{borderColor: 'var(--gray-200)'}}/>
                    <AddSubscriptionForm customers={customers} onSubscriptionAdded={fetchData} />
                </div>
            </div>
        </Card>
    );
}

function CustomerPanel() {
    const [customerId, setCustomerId] = useState('');
    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchCustomer = async (e) => {
        e.preventDefault();
        if (!customerId) {
            setError({ message: 'Please enter a Customer ID.' });
            return;
        }
        setLoading(true);
        setError(null);
        setCustomerData(null);
        try {
            const data = await apiService.get(`/customer/${customerId}`);
            setCustomerData(data);
        } catch (err) {
            setError({ message: 'Error fetching customer.', details: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Customer Hub</h2>
            <form onSubmit={handleFetchCustomer} className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                <label htmlFor="customer-id" className="sr-only">Customer ID</label>
                <Input 
                    id="customer-id"
                    type="number" 
                    value={customerId} 
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter your Customer ID"
                    className="flex-grow"
                />
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                    {loading ? <Spinner /> : 'Check My Subscription'}
                </Button>
            </form>

            {error && <Alert message={error.message} details={error.details} type="error" />}

            {customerData && (
                <div className="text-center bg-blue-50 p-6 rounded-lg animate-fade-in">
                    <h3 className="text-2xl font-semibold text-blue-800">Welcome, {customerData.name}!</h3>
                    {customerData.subs && customerData.subs.subtime ? (
                        <>
                            <p className="text-lg text-gray-700 mt-2">
                                Subscription active until: <span className="font-bold text-blue-600">{new Date(customerData.subs.subtime).toLocaleDateString()}</span>
                            </p>
                            {'days_remaining' in customerData &&
                                <p className={`text-4xl font-bold mt-4 ${customerData.days_remaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {customerData.days_remaining} Days Remaining
                                </p>
                            }
                        </>
                    ) : (
                         <p className="text-lg text-gray-700 mt-2">No active subscription found.</p>
                    )}
                </div>
            )}
        </Card>
    );
}


// --- Main App Component ---
export default function App() {
    const [activeView, setActiveView] = useState('worker'); // 'worker' or 'customer'

    const TABS = [
        { id: 'worker', label: 'Worker Dashboard' },
        { id: 'customer', label: 'Customer Hub' }
    ];

    return (
        <>
            <AppStyles />
            <div className="bg-gray-50 min-h-screen font-sans">
                <header className="bg-white shadow-md">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-blue-600">GameNet Portal</h1>
                            <div className="flex items-center space-x-2 rounded-lg bg-gray-200 p-1">
                                {TABS.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveView(tab.id)}
                                        className={`px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors duration-300 ${
                                            activeView === tab.id
                                                ? 'bg-white text-blue-600 shadow'
                                                : 'text-gray-600 hover:bg-gray-300'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </nav>
                </header>

                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="max-w-4xl mx-auto">
                        {activeView === 'worker' ? <WorkerPanel /> : <CustomerPanel />}
                    </div>
                </main>
                
                <footer className="text-center py-6 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} GameNet. Powered by Django & React.</p>
                </footer>
            </div>
        </>
    );
}
