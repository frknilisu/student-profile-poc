// src/components/GroupDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Box, Grid, Divider, Button } from '@mui/material';
import { getGroup } from '../services/groupService';

const GroupDetails = () => {
  const { group_id } = useParams();
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { supervisor, students } = location.state || {};

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await getGroup(group_id);
        setGroup(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [group_id]);

  const handleStudentClick = (student_id) => {
    navigate(`/getStudent/${student_id}`);
  };

  const handleUpdateClick = () => {
    navigate(`/updateGroup/${group_id}`);
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
            {supervisor.name || 'Unknown'}'s Group
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ mt: 2 }}>
          {/* Student Names in a Grid with Equal Space */}
          <Grid container spacing={1}>
            {students.map((student, index) => (
              <Grid item xs={6} key={index}>
                <Box 
                  sx={{ 
                    border: '1px solid #ccc', 
                    borderRadius: '4px', 
                    padding: '4px', 
                    textAlign: 'center',
                    height: '40px', // Fixed height for equal spacing
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer', // Make it clickable
                    transition: 'transform 0.2s, background-color 0.2s', // Smooth transition for hover and click
                    '&:hover': {
                      backgroundColor: '#f0f0f0', // Light grey on hover
                      transform: 'scale(1.05)', // Slight zoom on hover
                    },
                    '&:active': {
                      transform: 'scale(0.95)', // Slight shrink on click
                    },
                  }}
                  onClick={() => handleStudentClick(student._id)} // Navigate to StudentDetails page
                  >
                  <Typography variant="body2" component="p">
                    {student.name} {student.surname}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={handleUpdateClick}>
          Update Group
        </Button>
        <Button variant="contained" color="primary" onClick={handleBack} sx={{ ml: 2 }}>
          Back to Overview
        </Button>
      </Paper>
    </Container>
  );
};

export default GroupDetails;
