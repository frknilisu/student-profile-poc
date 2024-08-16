// src/components/GroupDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, List, ListItem, ListItemText, Divider, Button } from '@mui/material';

const GroupDetails = () => {
  const { group_id } = useParams();
  const [group, setGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getGroup/${group_id}`);
        setGroup(response.data.group);
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [group_id]);

  const handleStudentClick = (student_id) => {
    navigate(`/getStudent/${student_id}`);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!group) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Group {group.group_id}
          </Typography>
          <Typography variant="h6" component="h2">
            Supervisor: {group.supervisor_name}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" gutterBottom>
            Students
          </Typography>
          <List>
            {students.map((student) => (
              <ListItem key={student.student_id}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => handleStudentClick(student.student_id)}
                  sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
                  fullWidth
                >
                  <ListItemText
                    primary={`${student.name} ${student.surname}`}
                    sx={{ textDecoration: 'underline' }}
                  />
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={handleBack}>
          Back to Overview
        </Button>
      </Paper>
    </Container>
  );
};

export default GroupDetails;
