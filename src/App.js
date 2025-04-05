import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import authService from './services/auth';
import Login from './components/Login';
import CreateAcc from './components/CreateAcc';
import Dashboard from './components/dashboard/Dashboard';

function getLibrary(provider) {
  return new Web3Provider(provider);
}

export const AuthContext = createContext();

function AppWithWeb3() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAcc />} />
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppWithWeb3 />
    </Web3ReactProvider>
  );
}
