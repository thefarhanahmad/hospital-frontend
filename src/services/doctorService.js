import api from './api';
import { getAuthToken } from '../utils/auth';

export const registerDoctor = async (formData) => {
  try {
    const response = await api.post('/doctors/register', formData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};