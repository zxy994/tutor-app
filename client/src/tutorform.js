import React, { useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';


const TutorForm = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { token } = useParams();
    const [formSuccess, setFormSuccess] = useState([]);

    const [summary, setSummary] = useState('');
    const [courseTitle, setcourseTitle] = useState('');
    const [linkedinProfile, setLinkedinProfile] = useState('');
    const [passportImage, setPassportImage] = useState(null);
    const [courseSummary, setCourseSummary] = useState('');
    const [skills, setSkills] = useState([]);
    const [courseStructure, setCourseStructure] = useState([]);


    const handleSkillsChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSkills((prevSkills) => [...prevSkills, value]);
        } else {
            setSkills((prevSkills) => prevSkills.filter((skill) => skill !== value));
        }
    };

    const handleStructureChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCourseStructure((prevStructure) => [...prevStructure, value]);
        } else {
            setCourseStructure((prevStructure) =>
                prevStructure.filter((structure) => structure !== value)
            );
        }
    };


    const requestBody = {
        courseTitle: courseTitle,
        summary: summary,
        linkedinProfile: linkedinProfile,
        passportImag: passportImage,
        courseSummary: courseSummary,
        skills: skills,
        courseStructure: courseStructure
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // submit form data to server
        axios.post(`http://localhost:5000/api/user/login/d/${token}/profile/create`, JSON.stringify(requestBody), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(res => {
                console.log('form response: ', res.data);
                setFormSuccess(res.data);
            })
            .catch(err => {
                // Handle the error
                console.log('form error: ', err);
            });
    };

    return (

        <form onSubmit={handleSubmit}>
            {
                !(formSuccess.length === 0) ? (
                    <div>
                        <p>Profile updated</p>
                    </div>
                ) :
                    (
                        <div>
                            <label>
                                Course Title:
                                <textarea value={courseTitle} onChange={(e) => setcourseTitle(e.target.value)} />
                            </label>
                            <label>
                                Summary:
                                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
                            </label>
                            <label>
                                LinkedIn Profile:
                                <input type="text" value={linkedinProfile} onChange={(e) => setLinkedinProfile(e.target.value)} />
                            </label>
                            <label>
                                Passport Picture:
                                <input type="file" onChange={(e) => setPassportImage(e.target.files[0])} />
                            </label>
                            <label>
                                Course Summary:
                                <textarea value={courseSummary} onChange={(e) => setCourseSummary(e.target.value)} />
                            </label>
                            <label>
                                Skills:
                                <div>
                                    <input type="checkbox" value="skill1" checked={skills.includes('skill1')} onChange={handleSkillsChange} />
                                    <label>Skill 1</label>
                                </div>
                                <div>
                                    <input type="checkbox" value="skill2" checked={skills.includes('skill2')} onChange={handleSkillsChange} />
                                    <label>Skill 2</label>
                                </div>
                                <div>
                                    <input type="checkbox" value="skill3" checked={skills.includes('skill3')} onChange={handleSkillsChange} />
                                    <label>Skill 3</label>
                                </div>
                            </label>
                            <label>
                                Course Structure:
                                <div>
                                    <input type="checkbox" value="structure1" checked={courseStructure.includes('structure1')} onChange={handleStructureChange} />
                                    <label>Structure 1</label>
                                </div>
                                <div>
                                    <input type="checkbox" value="structure2" checked={courseStructure.includes('structure2')} onChange={handleStructureChange} />
                                    <label>Structure 2</label>
                                </div>
                                <div>
                                    <input type="checkbox" value="structure3" checked={courseStructure.includes('structure3')} onChange={handleStructureChange} />
                                    <label>Structure 3</label>
                                </div>
                            </label>
                            <button type="submit">Submit</button>

                        </div>
                    )
            }

            <p><Link to={`http://localhost:5000/api/user/login/d/${token}/dashboard`}>Back</Link></p >

        </form>

    );
}

export default TutorForm;
