// src/components/CreateStudent.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid
} from '@mui/material';
import { createStudent } from '../services/studentService';
import { getGroups } from '../services/groupService';

const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    surname: '',
    class_level: '',
    school: '',
    birthday: '',
    mobile_number: '',
    address: '',
    parent_name: '',
    parent_number: '',
    group_id: '',
  });
  // const [form, setForm] = useState({});
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getGroups();
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createStudent(student);
      console.log('Student created successfully:', response.data);
      var student_id = response.data.student_id;
      navigate(`/getStudent/${student_id}`);
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
              defaultValue={"2000-01-01"}
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
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={student.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Parent Name"
              name="parent_name"
              value={student.parent_name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Parent Number"
              name="parent_number"
              value={student.parent_number}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Group</InputLabel>
              <Select
                name="group_id"
                value={student.group_id || ''}
                onChange={handleChange}
              >
                {groups.map((group) => (
                  <MenuItem key={group.group_id} value={group.group_id}>
                    {`Group ${group.group_id} - ${group.supervisor_name}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
