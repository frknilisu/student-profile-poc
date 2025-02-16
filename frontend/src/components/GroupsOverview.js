// src/components/GroupsOverview.js
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Container, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchGroups, fetchStudents, fetchSupervisors } from '../services/data';

const GroupsOverview = () => {
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const groupsData = await fetchGroups();
      const studentsData = await fetchStudents();
      const supervisorsData = await fetchSupervisors();
      setGroups(groupsData);
      setStudents(studentsData);
      setSupervisors(supervisorsData);
    };
    fetchData();
  }, []);

  const handleGroupClick = (group_id) => {
    const group = groups.find(g => g._id === group_id);
    const supervisorOfGroup = supervisors.find(s => s._id === group.supervisor_id);
    const studentsOfGroup = group.student_ids.map(student_id => {
      return students.find(s => s._id === student_id);
    });

    navigate(`/getGroup/${group_id}`, {
      state: {
        supervisor: supervisorOfGroup,
        students: studentsOfGroup
      }
    });
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
              onClick={() => handleGroupClick(group._id)}
            >
              <CardContent sx={{ padding: 2 }}>
                {/* Supervisor Name */}
                <Typography variant="h6" component="h2" gutterBottom>
                  {supervisors.find(s => s._id === group.supervisor_id)?.name || 'Unknown'}'s Group
                </Typography>
                <Divider sx={{ my: 2 }} />
                {/* Student Names in a Grid with Equal Space */}
                <Grid container spacing={1}>
                  {group.student_ids.map((student_id, index) => {
                    const student = students.find(s => s._id === student_id);
                    return (
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
                            handleStudentClick(student_id);
                          }}
                        >
                          <Typography variant="body2" component="p">
                            {student ? `${student.name} ${student.surname}` : 'Loading...'}
                          </Typography>
                        </Box>
                      </Grid>
                    );
                  })}
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
