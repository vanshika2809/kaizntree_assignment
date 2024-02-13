import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import ItemDashboard from './components/ItemDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/item-dashboard" element={
          <ProtectedRoute>
            <ItemDashboard />
          </ProtectedRoute>
        } />
        <Route
          path="*"
          element={
            <Navigate to="/item-dashboard" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
