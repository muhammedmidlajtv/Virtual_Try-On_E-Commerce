import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import CreateAccount from './pages/CreateAccount';
import LandingPage from './pages/LandingPage'; 
import BrowseCollection from './pages/BrowseCollection';
import ProductCatalog from './pages/ProductCatalog';
import AdminPage from './pages/AdminPage'; // Import AdminPage

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/collection" element={<ProductCatalog />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/admin" element={<AdminPage />} /> {/* Add admin route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;