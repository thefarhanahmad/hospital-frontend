import api from './api';
import { getAuthToken } from '../utils/auth';

export const updatePathologyProfile = async (profileData) => {
  try {
    const response = await api.patch('/pathlabs/register', profileData, {
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

export const getPathologyProfile = async () => {
  try {
    const response = await api.get('/pathlabs/profile', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};