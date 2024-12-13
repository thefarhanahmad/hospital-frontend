import api from './api';
import { getAuthToken } from '../utils/auth';

export const updateBloodBankProfile = async (profileData) => {
  try {
    const response = await api.patch('/bloodbanks/register', profileData, {
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

export const getBloodBankProfile = async () => {
  try {
    const response = await api.get('/bloodbanks/profile', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};