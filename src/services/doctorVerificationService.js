import api from './api';
import { getAuthToken } from '../utils/auth';

export const updateDoctorVerification = async (doctorId, verificationData) => {
  try {
    const response = await api.patch(
      `/doctors/${doctorId}/verifica`,
      verificationData,
      {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};