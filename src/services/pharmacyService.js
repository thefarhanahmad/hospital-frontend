import api from './api';
import { getAuthToken } from '../utils/auth';

export const updatePharmacyProfile = async (profileData) => {
  try {
    const response = await api.patch('/pharmacies/register', profileData, {
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

export const generateBill = async (billData) => {
  try {
    const response = await api.post('/pharmacies/billing', billData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      responseType: 'blob', // Important for PDF download
    });
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getBills = async () => {
  try {
    const response = await api.get('/pharmacies/bills', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};