// src/components/UpdateStudent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    surname: '',
    grade: '',
    school: '',
    birthday: '',
    mobile_number: ''
  });

  const { student_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getStudent/${student_id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('There was an error fetching the student details!', error);
      }
    };

    fetchStudent();
  }, [student_id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/updateStudent/${student_id}`, { ...student });
      navigate('/');
    } catch (error) {
      console.error('There was an error updating the student!', error);
    }
  };

  return (
    <div>
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={student.name} onChange={handleChange} required />
        <input type="text" name="surname" value={student.surname} onChange={handleChange} required />
        <input type="text" name="class_level" value={student.class_level} onChange={handleChange} required />
        <input type="text" name="school" value={student.school} onChange={handleChange} required />
        <input type="date" name="birthday" value={student.birthday} onChange={handleChange} required />
        <input type="text" name="mobile_number" value={student.mobile_number} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
