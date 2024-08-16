// src/components/GroupsOverview.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Button, Container } from '@mui/material';
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

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Group Overview
      </Typography>
      <Grid container spacing={4}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group.group_id}>
            <Card onClick={() => handleGroupClick(group.group_id)} sx={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {group.supervisor_name}'s Group
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Group ID: {group.group_id}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleGroupClick(group.group_id)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GroupsOverview;
