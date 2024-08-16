// src/components/StudentDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const { student_id } = useParams();

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

  return (
    <div>
      <h2>Student Details</h2>
      {student ? (
        <div>
          <p>Name: {student.name}</p>
          <p>Surname: {student.surname}</p>
          <p>Grade: {student.grade}</p>
          <p>School: {student.school}</p>
          <p>Birthday: {student.birthday}</p>
          <p>Mobile Number: {student.mobile_number}</p>
          <Link to={`/updateStudent/${student.student_id}`}>Update</Link>
          <Link to="/">Back to list</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudentDetails;
