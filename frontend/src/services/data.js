import { getGroups } from './groupService';
import { getStudents } from './studentService';
import { getSupervisors } from './supervisorService';

export const fetchGroups = async () => {
    try {
        const response = await getGroups();
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error);
    }
};

export const fetchStudents = async () => {
    try {
        const response = await getStudents();
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
    }
};

export const fetchSupervisors = async () => {
    try {
        const response = await getSupervisors();
        return response.data;
    } catch (error) {
        console.error('Error fetching supervisors:', error);
    }
};