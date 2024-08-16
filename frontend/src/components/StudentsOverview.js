// src/components/StudentsOverview.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CardActions, Button, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const StudentsOverview = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getStudents');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleViewDetails = (student_id) => {
    navigate(`/getStudent/${student_id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Students Overview
      </Typography>
      {/* Add the Link to Students Overview */}
      <Button component={Link} to="/" variant="outlined" color="primary" sx={{ mb: 3 }}>
        Go to Groups Overview
      </Button>
      <Grid container spacing={4}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.student_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {student.name} {student.surname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Class Level: {student.class_level}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  School: {student.school}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Group: {student.group_id}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleViewDetails(student.student_id)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentsOverview;
