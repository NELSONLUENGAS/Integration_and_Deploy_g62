import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token') || null);
	const [notify, setNotify] = useState(false);

	const login = (newToken) => {
		setToken(newToken);
		localStorage.setItem('token', newToken);
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem('token');
	};

	return (
		<AuthContext.Provider value={{ token, login, logout, notify, setNotify }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
