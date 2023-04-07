import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const requestBody = {
        email: email,
        password: password
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setErrorMsg('Please enter a valid email and password');
        } else {
            axios.post('http://localhost:5000/api/user/login', JSON.stringify(requestBody), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    const token = res.data;
                    // Redirect to previous location or dashboard on successful login
                    if (location.state && location.state.from) {
                        navigate(location.state.from, { replace: true });
                    } else {
                        navigate(`/api/user/login/d/${token}/dashboard`, { replace: true });
                    }


                })
                .catch(err => {
                    // Handle the error
                });
            console.log('login successful');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">Login</button>
                {errorMsg && <p>{errorMsg}</p>}
            </form>
            <p><Link to="/">Home</Link></p >
        </div>
    );
};

export default Login;
