// src/components/UpdateStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Typography, TextField, Button, Paper, Box, Divider } from '@mui/material';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';


const UpdateStudent = () => {
  const { student_id } = useParams();
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({});
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getStudent/${student_id}`);
        setStudent(response.data);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getGroups'); // Replace with your actual endpoint
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchStudentDetails();
    fetchGroups();
  }, [student_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/updateStudent/${student_id}`, form);
      navigate(`/getStudent/${student_id}`);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (!student) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Student
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={form.name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Surname"
            name="surname"
            value={form.surname || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Birthday"
            type="date"
            name="birthday"
            value={form.birthday ? form.birthday.split('T')[0] : ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Class Level"
            name="class_level"
            value={form.class_level || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="School"
            name="school"
            value={form.school || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mobile Number"
            name="mobile_number"
            value={form.mobile_number || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Group</InputLabel>
            <Select
              name="group_id"
              value={form.group_id || ''}
              onChange={handleInputChange}
            >
              {groups.map((group) => (
                <MenuItem key={group.group_id} value={group.group_id}>
                  {`Group ${group.group_id} - ${group.supervisor_name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Paper>
    </Container>
  );
};

export default UpdateStudent;
