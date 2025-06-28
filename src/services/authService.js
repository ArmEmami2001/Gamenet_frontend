// src/services/authService.js
import api from './api';

const authService = {
    // This now points to your custom login endpoint
    login: async (username, password) => {
        const response = await api.post('/auth/login', { username, password });
        return response.data;
    },

    // This function checks the user's role by trying to access an employee-only endpoint
    getUserRole: async (token) => {
      try {
        await api.get('/employee/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return 'employee';
      } catch (error) {
        // If the request fails, we assume the user is a customer
        return 'customer';
      }
    },

    // --- The rest of the functions are correct ---
    registerCustomer: async (username, password) => {
        return await api.post('/customer/create-customer', { username, password });
    },
    registerEmployee: async (username, password) => {
        return await api.post('/employee/add_employee', { username, password });
    },
    getCustomerProfile: async () => {
        const response = await api.get('/customer/me');
        return response.data;
    },
    getEmployeeProfile: async () => {
        const response = await api.get('/employee/me');
        return response.data;
    },
    getAllCustomers: async () => {
        const response = await api.get('/employee/addsub');
        return response.data;
    },
    updateCustomerSub: async (customerId, subDate) => {
        const response = await api.put(`/employee/addsub/${customerId}`, { subtime: subDate });
        return response.data;
    }
};

export default authService;