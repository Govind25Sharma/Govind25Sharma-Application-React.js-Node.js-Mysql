
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Employee() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setEmployees(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/employee/${id}`);
            setEmployees(employees.filter(employee => employee.id !== id)); // Update the state to remove the deleted employee
        } catch (err) {
            console.log(err);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className='d-flex vh-100 bg-black justify-content-center align-items-center'>
            <div className='form-container'>
                <Link to="/createEmployee" className='btn btn-success mb-3'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>DOB</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{formatDate(employee.dob)}</td>
                                <td>
                                    <Link to={`/updateEmployee/${employee.id}`} className='btn btn-primary'>Update</Link>
                                    <button onClick={() => handleDelete(employee.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employee;
