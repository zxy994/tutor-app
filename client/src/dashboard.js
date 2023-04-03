import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const { token } = useParams();
    const [profile, setProfile] = useState(null);

    const handleSubmit = (event) => {
        axios.get('http://localhost:5000/api/user/login/d/in', {
            headers: { 'Authorization': `${token}` },
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>

            <button onClick={handleSubmit}>Logout</button>
            <p><Link to="/">Home</Link></p >

        </div>
    )
}

export default Dashboard;
