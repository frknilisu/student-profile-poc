import React, { useState } from 'react';
import axios from 'axios';

function StudentProfile() {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = window.location.pathname.split('/').pop();
    axios.get(`http://localhost:5000/api/students/${studentId}`)
      .then(response => {
        setStudent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/students/${student