// src/components/GroupDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/groups/${groupId}`);
        setGroup(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (!group) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {group.supervisor_name}'s Group
      </Typography>
      <Typography variant="h6" gutterBottom>
        Group ID: {group.group_id}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Students:
      </Typography>
      <List>
        {group.students.map((student) => (
          <ListItem key={student.student_id}>
            <ListItemText primary={`${student.name} ${student.surname}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GroupDetails;
