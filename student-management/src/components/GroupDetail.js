// src/components/GroupDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GroupDetail = () => {
  const [group, setGroup] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getGroup/${id}`);
        setGroup(response.data);
      } catch (error) {
        console.error('There was an error fetching the group details!', error);
      }
    };

    fetchGroup();
  }, [id]);

  return (
    <div>
      <h2>Group Detail</h2>
      {group ? (
        <div>
          <p>Group Name: {group.group_name}</p>
          <p>Leader ID: {group.leader_id}</p>
          <h3>Students:</h3>
          <ul>
            {group.students.map(student => (
              <li key={student.student_id}>
                {student.name} {student.surname}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GroupDetail;
