// src/components/CreateGroup.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { createGroup } from '../services/groupService';
import { getSupervisors } from '../services/supervisorService';
import { getStudents } from '../services/studentService';

const CreateGroup = () => {
  const [supervisor_id, setSupervisorId] = useState('');
  const [supervisors, setSupervisors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await getSupervisors();
        setSupervisors(response.data);
      } catch (error) {
        console.error('Error fetching supervisors:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchSupervisors();
    fetchStudents();
  }, []);
  
  const handleCreateGroup = async () => {
    try {
      await createGroup({ 
        supervisor_id: form.supervisor_id, 
        student_ids: selectedStudents 
      });

      setSupervisorId('');
      setSelectedStudents([]);
      alert('Group created successfully');
      
      navigate('/');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const handleSupervisorChange = (event) => {
    const { name, value } = event.target;
    const supervisor = supervisors.find(s => s._id === value);
    setForm({
      ...form,
      supervisor_id: supervisor._id,
      supervisor_name: supervisor.name
    });
  };

  const handleStudentChange = (event) => {
    setSelectedStudents(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Group
      </Typography>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Supervisor</InputLabel>
          <Select
            name="supervisor_id"
            value={form.supervisor_id || ''}
            onChange={handleSupervisorChange}
          >
            {supervisors.map((supervisor) => (
              <MenuItem key={supervisor._id} value={supervisor._id}>
                {`Group ${supervisor.name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Students</InputLabel>
          <Select
            multiple
            value={selectedStudents}
            onChange={handleStudentChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {students.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" color="primary" onClick={handleCreateGroup}>
        Create Group
      </Button>
    </Container>
  );
};

export default CreateGroup;
