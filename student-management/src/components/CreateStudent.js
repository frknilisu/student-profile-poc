// src/components/CreateStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    surname: '',
    grade: '',
    school: '',
    birthday: '',
    age: '',
    mobile_number: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/create', student);
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the student!', error);
    }
  };

  return (
    <div>
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="surname" placeholder="Surname" onChange={handleChange} required />
        <input type="text" name="grade" placeholder="Grade" onChange={handleChange} required />
        <input type="text" name="school" placeholder="School" onChange={handleChange} required />
        <input type="date" name="birthday" placeholder="Birthday" onChange={handleChange} required />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="mobile_number" placeholder="Mobile Number" onChange={handleChange} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateStudent;
