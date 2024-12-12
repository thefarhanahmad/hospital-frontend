import api from './api';
import { getAuthToken } from '../utils/auth';

export const createPrescription = async (prescriptionData) => {
  try {
    const response = await api.post('/doctors/prescription', prescriptionData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPrescriptions = async () => {
  try {
    const response = await api.get('/doctors/prescriptions', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};