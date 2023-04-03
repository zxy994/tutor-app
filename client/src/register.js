import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const requestBody = {
        email: email,
        name: name,
        password: password
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setErrorMsg('Please enter a valid email and password');
        } else {
            axios.post('http://localhost:5000/api/user/register', JSON.stringify(requestBody), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    // Do something with the response data

                    // Redirect to previous location or login page on success
                    if (location.state && location.state.from) {
                        navigate(location.state.from, { replace: true });
                    } else {
                        navigate(`/login`, { replace: true });
                    }
                })
                .catch(err => {
                    // Handle the error
                });
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={handleNameChange} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">Register</button>
                {errorMsg && <p>{errorMsg}</p>}
            </form>
            <p><Link to="/">Home</Link></p >
        </div>
    );
};

export default Register;
