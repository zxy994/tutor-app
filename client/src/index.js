import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Register from './register';
import Login from './login';
import Dashboard from './dashboard';
import { createRoot } from 'react-dom/client';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />,
                <Route path="/register" element={<Register />} />,
                <Route path="/login" element={<Login />} />,
                <Route path="/api/user/login/d/:token" element={<Dashboard />} />
            </Routes>
        </Router>

    );
};

createRoot(document.getElementById('root')).render(<App />);