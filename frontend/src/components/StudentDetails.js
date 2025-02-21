// src/components/StudentDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Collapse } from '@mui/material';
import { getStudent } from '../services/studentService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const getWeekNumber = (date) => {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + days) / 7);
};

const getWeekStartEndDates = (weekNumber, year) => {
  const startDate = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return { startDate, endDate };
};

const generateYearlyRecords = (weeklyRecords, year) => {
  const yearlyRecords = Array.from({ length: 52 }, (_, i) => {
    const weekNumber = i + 1;
    const { startDate, endDate } = getWeekStartEndDates(weekNumber, year);
    const record = weeklyRecords.find((rec) => getWeekNumber(new Date(rec.date)) === weekNumber);
    return {
      week_number: weekNumber,
      start_date: startDate.toLocaleDateString(),
      end_date: endDate.toLocaleDateString(),
      quran: record ? record.quran : 0,
      risale: record ? record.risale : 0,
      pirlanta: record ? record.pirlanta : 0,
      diger_kitap: record ? record.diger_kitap : 0,
      kaset: record ? record.kaset : 0,
      cevsan: record ? record.cevsan : 0,
      teheccud: record ? record.teheccud : 0,
      oruc: record ? record.oruc : 0,
      ezber: record ? record.ezber : 0,
      vakit_namaz: record ? record.vakit_namaz : 0,
    };
  });
  return yearlyRecords;
};

const StudentDetails = () => {
  const { student_id } = useParams();
  const [student, setStudent] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await getStudent(student_id);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudentDetails();
  }, [student_id]);

  const handleUpdateClick = () => {
    navigate(`/updateStudent/${student_id}`);
  };

  const handleBack = () => {
    navigate('/getStudents');
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  if (!student) {
    return <Typography>Loading...</Typography>;
  }

  const currentYear = new Date().getFullYear();
  const yearlyRecords = generateYearlyRecords(student.weekly_records, currentYear);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {student.name} {student.surname}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Class Level: {student.class_level}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            School: {student.school}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Birthday: {student.birthday}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Mobile Number: {student.mobile_number}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Address: {student.address}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Parent Name: {student.parent_name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Parent Number: {student.parent_number}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Weekly Records
              <IconButton onClick={handleToggle}>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Typography>
            <Collapse in={open}>
              <TableContainer component={Paper} sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Week (No. + Date)</b></TableCell>
                      <TableCell align="center"><b>Quran</b></TableCell>
                      <TableCell align="center"><b>Risale</b></TableCell>
                      <TableCell align="center"><b>Pırlanta</b></TableCell>
                      <TableCell align="center"><b>Diğer Kitap</b></TableCell>
                      <TableCell align="center"><b>Kaset</b></TableCell>
                      <TableCell align="center"><b>Cevşen</b></TableCell>
                      <TableCell align="center"><b>Teheccüd</b></TableCell>
                      <TableCell align="center"><b>Oruç</b></TableCell>
                      <TableCell align="center"><b>Ezber</b></TableCell>
                      <TableCell align="center"><b>5 Vakit Farz Namaz</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {yearlyRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          Week {record.week_number} ({record.start_date} - {record.end_date})
                        </TableCell>
                        <TableCell align="center">{record.quran}</TableCell>
                        <TableCell align="center">{record.risale}</TableCell>
                        <TableCell align="center">{record.pirlanta}</TableCell>
                        <TableCell align="center">{record.diger_kitap}</TableCell>
                        <TableCell align="center">{record.kaset}</TableCell>
                        <TableCell align="center">{record.cevsan}</TableCell>
                        <TableCell align="center">{record.teheccud}</TableCell>
                        <TableCell align="center">{record.oruc}</TableCell>
                        <TableCell align="center">{record.ezber}</TableCell>
                        <TableCell align="center">{record.vakit_namaz}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Collapse>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" color="primary" onClick={handleUpdateClick}>
          Update Student
        </Button>
        <Button variant="contained" color="primary" onClick={handleBack} sx={{ ml: 2 }}>
          Back to Overview
        </Button>
      </Paper>
    </Container>
  );
};

export default StudentDetails;
