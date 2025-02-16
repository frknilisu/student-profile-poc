import api from './api';

export const getSupervisors = () => api.get('/supervisors/');
export const getSupervisor = (id) => api.get(`/supervisors/${id}`);
export const createSupervisor = (data) => api.post('/supervisors/', data);
export const updateSupervisor = (id, data) => api.put(`/supervisors/${id}`, data);
export const deleteSupervisor = (id) => api.delete(`/supervisors/${id}`);
