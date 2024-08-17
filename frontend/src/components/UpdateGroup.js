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


const UpdateGroup = () => {
  const { group_id } = useParams();
  const [group, setGroup] = useState(null);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getGroup/${group_id}`);
        setGroup(response.data.group);
        setForm(response.data.group);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchGroupDetails();
  }, [group_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/updateGroup/${group_id}`, form);
      navigate(`/getGroup/${group_id}`);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  if (!group) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Group
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Supervisor Name"
            name="supervisor_name"
            value={form.supervisor_name || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Group Id"
            name="group_id"
            value={form.group_id || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Paper>
    </Container>
  );
};

export default UpdateGroup;
