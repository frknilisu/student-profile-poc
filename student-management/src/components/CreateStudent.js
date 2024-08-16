// src/components/CreateStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';

const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    surname: '',
    class_level: '',
    school: '',
    birthday: '',
    mobile_number: '',
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/create', student);
      console.log('Student created successfully:', response.data);
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Student
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="First Name"
              name="name"
              value={student.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Last Name"
              name="surname"
              value={student.surname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Class Level"
              name="class_level"
              value={student.class_level}
              onChange={handleChange}
              required
              placeholder="e.g., VWO-3, HAVO-4, ISK"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="School"
              name="school"
              value={student.school}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Birthday"
              name="birthday"
              type="date"
              value={student.birthday}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile_number"
              value={student.mobile_number}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Create Student
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateStudent;
