import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { token } = useParams();

    const handleCreateProfileButton = (event) => {
        navigate(`/api/user/login/d/${token}/profile`, { replace: true });
    };


    const handleUpdateProfileButton = (event) => {
        navigate(`/api/user/login/d/${token}/profile`, { replace: true });
    }


    const handleDisplayProfileButton = (event) => {
        navigate(`/api/user/login/d/${token}/disProfile`, { replace: true });
    };


    const handleLogout = (event) => {
        window.open('/', '_self');
    };


    return (
        <div>

            <button onClick={handleCreateProfileButton}>Create Profile</button>
            <button onClick={handleUpdateProfileButton}>Update Profile</button>
            <button onClick={handleDisplayProfileButton}>Display Profile</button>
            <p><button onClick={handleLogout}>Logout</button></p>
        </div>
    )

}

export default Dashboard;
