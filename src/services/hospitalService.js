import api from './api';
import { getAuthToken } from '../utils/auth';

export const updateHospitalProfile = async (profileData) => {
  try {
    const response = await api.patch('/hospitals/register', profileData, {
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

export const getBedStatus = async () => {
  try {
    const response = await api.get('/hospitals/beds', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateBedStatus = async (wardId, updates) => {
  try {
    const response = await api.patch(`/hospitals/beds/${wardId}`, updates, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const admitPatient = async (patientData) => {
  try {
    const response = await api.post('/hospitals/admission', patientData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const dischargePatient = async (dischargeData) => {
  try {
    const response = await api.post('/hospitals/patients/discharge', dischargeData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};