import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Register from './register';
import Login from './login';
import Dashboard from './dashboard';
import TutorForm from './tutorform';
import ProfileDisplay from './profiledisplay';

import { createRoot } from 'react-dom/client';

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />,
                <Route path="/register" element={<Register />} />,
                <Route path="/login" element={<Login />} />,
                <Route path="/api/user/login/d/:token/dashboard" element={<Dashboard />} />
                <Route path="/api/user/login/d/:token/profile" element={<TutorForm />} />
                <Route path="/api/user/login/d/:token/disProfile" element={<ProfileDisplay />} />
            </Routes>
        </Router>

    );
};

createRoot(document.getElementById('root')).render(<App />);