import React, { useState } from 'react';
import axios from 'axios';

function StudentProfile() {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = window.location.pathname.split('/').pop();
    axios.get(`https://student-profile-poc-30f120e03352.herokuapp.com/api/students/${studentId}`)
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
    axios.put(`https://student-profile-poc-30f120e03352.herokuapp.com/api/students/${student