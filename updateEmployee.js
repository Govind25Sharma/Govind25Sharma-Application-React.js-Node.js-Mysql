import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateEmployee() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDOB] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, { name, email, mobile, dob })
            .then(res => {
                console.log(res);
                navigate('/');
                setName('');
                setEmail('');
                setMobile('');
                setDOB('');
            })
            .catch(err => {
                console.error('Error:', err);
                setError('An error occurred. Please try again later.');
            });
    }

    return (
            <div className='d-flex vh-100 bg-black justify-content-center align-items-center'>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Employee</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className='mb-2'>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control' value={name}
                            onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' value={email}
                            onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="mobile">Mobile</label>
                        <input type="tel" placeholder='Enter Mobile' className='form-control' value={mobile}
                            onChange={e => setMobile(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="dob">DOB</label>
                        <input type="date" placeholder='Enter DOB' className='form-control' value={dob}
                            onChange={e => setDOB(e.target.value)} required />
                    </div>
                    <button type="submit" className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateEmployee;
