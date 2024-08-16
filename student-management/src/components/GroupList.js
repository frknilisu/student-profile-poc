// src/components/GroupList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getGroups');
        setGroups(response.data);
      } catch (error) {
        console.error('There was an error fetching the groups!', error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div>
      <h2>Group List</h2>
      <ul>
        {groups.map(group => (
          <li key={group.group_id}>
            <Link to={`/getGroup/${group.group_id}`}>
              {group.group_name} (Leader: {group.leader_id})
            </Link>
            <ul>
              {group.students.map(student => (
                <li key={student.student_id}>{student.name} {student.surname}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
