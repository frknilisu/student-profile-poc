// src/components/CreateGroup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
  const [supervisorName, setSupervisorName] = useState('');
  const [group_id, setGroupId] = useState('');
  const navigate = useNavigate();
  
  const handleCreateGroup = async () => {
    try {
      await axios.post('http://localhost:5000/createGroup', {
        supervisor_name: supervisorName,
        group_id: group_id
      });
      setSupervisorName('');
      setGroupId('');
      alert('Group created successfully');
      
      navigate('/');
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Group
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Supervisor Name"
          value={supervisorName}
          onChange={(e) => setSupervisorName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Group ID"
          value={group_id}
          onChange={(e) => setGroupId(e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleCreateGroup}>
        Create Group
      </Button>
    </Container>
  );
};

export default CreateGroup;
