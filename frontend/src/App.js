// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateStudent from './components/CreateStudent';
import StudentsOverview from './components/StudentsOverview';
import StudentDetails from './components/StudentDetails';
import UpdateStudent from './components/UpdateStudent';
// import CreateGroup from './components/CreateGroup';
import GroupsOverview from './components/GroupsOverview';
import GroupDetails from './components/GroupDetails';
import UpdateGroup from './components/UpdateGroup';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      {/* <div className="App"> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<GroupsOverview />} />
          <Route path="/createStudent" element={<CreateStudent />} />
          <Route path="/getStudents" element={<StudentsOverview />} />
          <Route path="/getStudent/:student_id" element={<StudentDetails />} />
          <Route path="/updateStudent/:student_id" element={<UpdateStudent />} />
          {/* <Route path="/createGroup" element={<CreateGroup />} /> */}
          <Route path="/getGroups" element={<GroupsOverview />} />
          <Route path="/getGroup/:group_id" element={<GroupDetails />} />
          <Route path="/updateGroup/:group_id" element={<UpdateGroup />} />
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
