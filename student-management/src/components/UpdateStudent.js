// src/components/UpdateStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Grid, Box, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
  const { student_id } = useParams();
  const [student, setStudent] = useState({
    name: '',
    surname: '',
    class_level: '',
    school: '',
    birthday: '',
    mobile_number: '',
    group_id: ''
  });
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getStudent/${student_id}`);
        const studentData = response.data;
        studentData.birthday = new Date(studentData.birthday);
        setStudent(studentData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getGroups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchStudentData();
    fetchGroups();
  }, [student_id]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setStudent({
      ...student,
      birthday: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/updateStudent/${student_id}`, {
        ...student,
        birthday: student.birthday.toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
      });
      console.log('Student updated successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Student
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
              placeholder="e.g., VWO-3, HAVO-4"
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
            <Typography variant="body1" gutterBottom>
              Birthday
            </Typography>
            <DatePicker
              selected={student.birthday}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              showYearDropdown
              scrollableMonthYearDropdown
              placeholderText="Select a date"
              customInput={<TextField fullWidth />}
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
            <TextField
              select
              fullWidth
              label="Group"
              name="group_id"
              value={student.group_id}
              onChange={handleChange}
              required
            >
              {groups.map((group) => (
                <MenuItem key={group.group_id} value={group.group_id}>
                  {group.supervisor_name} - Group {group.group_id}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Update Student
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateStudent;
