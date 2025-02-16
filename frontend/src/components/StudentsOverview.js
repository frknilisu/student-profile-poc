// src/components/StudentsOverview.js
import React, { useState, useEffect } from 'react';
import { TextField, Grid, Card, CardContent, Typography, Container, MenuItem, Select, InputLabel, InputAdornment, FormControl, Box, CardActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { getStudents } from '../services/studentService';

const StudentsOverview = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedField, setSelectedField] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleViewDetails = (student_id) => {
    navigate(`/getStudent/${student_id}`);
  };

  const handleFieldChange = (e) => {
    setSelectedField(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filterStudents = () => {
    let tempStudents = students;

    if (searchValue) {
      switch (selectedField) {
        case 'name':
          tempStudents = tempStudents.filter(student =>
            `${student.name} ${student.surname}`.toLowerCase().includes(searchValue.toLowerCase())
          );
          break;
        case 'school':
          tempStudents = tempStudents.filter(student =>
            student.school.toLowerCase().includes(searchValue.toLowerCase())
          );
          break;
        case 'class_level':
          tempStudents = tempStudents.filter(student =>
            student.class_level.toLowerCase().includes(searchValue.toLowerCase())
          );
          break;
        case 'group_id':
          tempStudents = tempStudents.filter(student =>
            student.group_id === parseInt(searchValue)
          );
          break;
        default:
          break;
      }
    }

    setFilteredStudents(tempStudents);
  };

  useEffect(() => {
    filterStudents();
  }, [searchValue, selectedField]);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>

      {/* Search and Filtering Controls */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Search Field</InputLabel>
          <Select
            value={selectedField}
            label="Search Field"
            onChange={handleFieldChange}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="school">School</MenuItem>
            <MenuItem value="class_level">Class Level</MenuItem>
            <MenuItem value="group_id">Group ID</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchValue}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Display Filtered Students */}
      <Grid container spacing={4}>
        {filteredStudents.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.student_id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {student.name} {student.surname}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Class Level: {student.class_level}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  School: {student.school}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Group: {student.group_id}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleViewDetails(student._id)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StudentsOverview;
