// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateStudent from './components/CreateStudent';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import UpdateStudent from './components/UpdateStudent';
import GroupList from './components/GroupList';
import GroupDetails from './components/GroupDetails';
import GroupOverview from './components/GroupOverview';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/student/:id" element={<StudentDetail />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
          <Route path="/getGroups" element={<GroupOverview />} />
          <Route path="/getGroup/:id" element={<GroupDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
