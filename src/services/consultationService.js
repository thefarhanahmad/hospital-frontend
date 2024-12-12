import api from './api';
import { getAuthToken } from '../utils/auth';

export const createConsultation = async (consultationData) => {
  try {
    const response = await api.post('/doctors/consultation', consultationData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};