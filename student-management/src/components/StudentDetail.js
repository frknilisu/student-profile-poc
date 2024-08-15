// src/components/StudentDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const StudentDetail = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getData?student_id=${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('There was an error fetching the student details!', error);
      }
    };

    fetchStudent();
  }, [id]);

  return (
    <div>
      <h2>Student Detail</h2>
      {student ? (
        <div>
          <p>Name: {student.name}</p>
          <p>Surname: {student.surname}</p>
          <p>Grade: {student.grade}</p>
          <p>School: {student.school}</p>
          <p>Birthday: {student.birthday}</p>
          <p>Age: {student.age}</p>
          <p>Mobile Number: {student.mobile_number}</p>
          <Link to={`/update/${student.student_id}`}>Update</Link>
          <Link to="/">Back to list</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudentDetail;
