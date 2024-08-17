// src/components/StudentDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button, Divider } from '@mui/material';

const StudentDetails = () => {
  const { student_id } = useParams();
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getStudent/${student_id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [student_id]);

  const handleUpdateClick = () => {
    navigate(`/updateStudent/${student_id}`);
  };

  const handleBack = () => {
    navigate('/getStudents');
  };

  if (!student) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {student.name} {student.surname}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Class Level: {student.class_level}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            School: {student.school}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Birthday: {student.birthday}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Mobile Number: {student.mobile_number}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Group ID: {student.group_id}
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={handleUpdateClick}>
          Update Student
        </Button>
        <Button variant="contained" color="primary" onClick={handleBack} sx={{ ml: 2 }}>
          Back to Overview
        </Button>
      </Paper>
    </Container>
  );
};

export default StudentDetails;
