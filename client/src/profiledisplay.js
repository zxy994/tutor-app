import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProfileDisplay = () => {
    const { token } = useParams();
    const [data, setData] = useState([]);


    useEffect(() => {
        const disData = async () => {
            const response = await axios.get(`http://localhost:5000/api/user/login/d/${token}/disProfile/p`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setData(response.data);
        };

        disData();
    }, []);


    return (
        <div>
            {
                !(data.length === 0) ? (
                    data.map((value, index) => {
                        return (
                            <div key={index}>
                                <h2>{value.linkedinProfile}</h2>
                                <h4>{value.courseTitle}</h4>
                                <p>{value.summary}</p>
                                <p>{value.courseSummary}</p>
                                <p>{value.skills}</p>
                                <p>{value.courseStructure}</p>

                            </div>
                        )
                    })
                ) : (
                    <div>
                        <p>Create Profile</p>
                    </div>
                )}

            <p><Link to={`http://localhost:5000/api/user/login/d/${token}/dashboard`}>Back</Link></p >

        </div>
    )
}

export default ProfileDisplay;