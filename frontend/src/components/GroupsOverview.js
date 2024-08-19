// src/components/GroupsOverview.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Container, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GroupsOverview = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getGroups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupClick = (group_id) => {
    navigate(`/getGroup/${group_id}`);
  };

  const handleStudentClick = (student_id) => {
    navigate(`/getStudent/${student_id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={group.group_id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'auto',
                cursor: 'pointer',
                border: '1px solid #ddd',
                '&:hover': {
                  borderColor: '#1976d2',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }
              }}
              onClick={() => handleGroupClick(group.group_id)}
            >
            {/* <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'auto' }}> */}
              <CardContent sx={{ padding: 2 }}>
                {/* Supervisor Name */}
                <Typography variant="h6" component="h2" gutterBottom>
                  {group.supervisor_name}'s Group
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Student Names in a Grid with Equal Space */}
                <Grid container spacing={1}>
                  {group.students.map((student, index) => (
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
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the card click
                          handleStudentClick(student.student_id);
                        }}
                        >
                        <Typography variant="body2" component="p">
                          {student.name} {student.surname}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GroupsOverview;
