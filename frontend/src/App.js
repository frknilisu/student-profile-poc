// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateStudent from './components/CreateStudent';
import UpdateStudent from './components/UpdateStudent';
import StudentsOverview from './components/StudentsOverview';
import StudentDetails from './components/StudentDetails';
// import GroupList from './components/GroupList';
import GroupDetails from './components/GroupDetails';
import GroupsOverview from './components/GroupsOverview';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GroupsOverview />} />
          <Route path="/createStudent" element={<CreateStudent />} />
          <Route path="/getStudents" element={<StudentsOverview />} />
          <Route path="/getStudent/:student_id" element={<StudentDetails />} />
          <Route path="/updateStudent/:student_id" element={<UpdateStudent />} />
          <Route path="/getGroups" element={<GroupsOverview />} />
          <Route path="/getGroup/:group_id" element={<GroupDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
