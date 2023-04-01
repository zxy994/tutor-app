const { React, useState } = require('react');
const { useHistory } = require('react-router-dom');
const axios = require('axios');

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';

const login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const history = useHistory();

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/user/login', formData);
            localStorage.setItem('token', res.data.token);
            history.push('/dashboard');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return React.createElement('div', null,
        React.createElement('h2', null, 'Login'),
        React.createElement('form', { onSubmit: onSubmit },
            React.createElement('input', {
                type: 'email',
                name: 'email',
                placeholder: 'Email',
                value: formData.email,
                onChange: onChange,
            }),
            React.createElement('br', null),
            React.createElement('input', {
                type: 'password',
                name: 'password',
                placeholder: 'Password',
                value: formData.password,
                onChange: onChange,
            }),
            React.createElement('br', null),
            React.createElement('button', { type: 'submit' }, 'Login')
        )
    );
};

module.exports = login