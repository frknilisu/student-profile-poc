// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Student Management System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/getGroups">Groups Overview</Button>
          <Button color="inherit" component={Link} to="/getStudents">Students Overview</Button>
          <Button color="inherit" component={Link} to="/createStudent">Create Student</Button>
          <Button color="inherit" component={Link} to="/createGroup">Create Group</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
