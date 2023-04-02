import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setErrorMsg('Please enter a valid email and password');
        } else {
            console.log('Email:', email);
            console.log('Password:', password);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
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
