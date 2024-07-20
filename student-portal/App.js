import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', phone: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetch('/api/students')
     .then(response => response.json())
     .then(data => setStudents(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingStudent) {
      fetch(`/api/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      })
       .then(response => response.json())
       .then((data) => {
          setStudents(students.map((s) => (s.id === data.id? data : s)));
          setNewStudent({ name: '', email: '', phone: '' });
          setEditingStudent(null);
        });
    } else {
      fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      })
       .then(response => response.json())
       .then((data) => {
          setStudents([...students, data]);
          setNewStudent({ name: '', email: '', phone: '' });
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({...newStudent, [name]: value });
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setNewStudent({ name: student.name, email: student.email, phone: student.phone });
  };

  const handleDelete = (studentId) => {
    fetch(`/api/students/${studentId}`, { method: 'DELETE' })
     .then(() => {
        setStudents(students.filter((s) => s.id!== studentId));
      });
  };

  return (
    <div>
      <h1>Student Portal</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={newStudent.name} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={newStudent.email} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" name="phone" value={newStudent.phone} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} ({student.email}) - {student.phone}
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;