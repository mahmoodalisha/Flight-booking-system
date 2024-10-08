// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(false); 

    const login = async (username, password) => {
        setLoading(true); 
        try {
            const response = await axios.post('http://localhost:5000/api/customers/login', { username, password });
            localStorage.setItem('token', response.data.token);
            setUser({ username }); 
            alert('Logged in successfully');
        } catch (error) {
            alert('Error logging in');
        } finally {
            setLoading(false); 
        }
    };

    const logout = () => {
        setUser(null); 
        localStorage.removeItem('token'); 
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);
