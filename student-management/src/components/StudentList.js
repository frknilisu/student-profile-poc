// src/components/StudentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getData');
        setStudents(response.data);
      } catch (error) {
        console.error('There was an error fetching the students!', error);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      setStudents(students.filter(student => student.student_id !== id));
    } catch (error) {
      console.error('There was an error deleting the student!', error);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      <Link to="/create">Create New Student</Link>
      <ul>
        {students.map(student => (
          <li key={student.student_id}>
            <Link to={`/student/${student.student_id}`}>{student.name} {student.surname}</Link>
            <button onClick={() => handleDelete(student.student_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
