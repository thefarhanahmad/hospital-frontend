import api from './api';
import { getAuthToken } from '../utils/auth';

export const createReport = async (reportData) => {
  try {
    const response = await api.post('/diagnostic/report', reportData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateDiagnosticsProfile = async (profileData) => {
  try {
    const response = await api.patch('/diagnostic/register', profileData, {
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

export const getDiagnosticsProfile = async () => {
  try {
    const response = await api.get('/diagnostic/profile', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getReports = async () => {
  try {
    const response = await api.get('/diagnostic/reports', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateReport = async (reportId, reportData) => {
  try {
    const response = await api.patch(`/diagnostic/report/${reportId}`, reportData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAppointments = async () => {
  try {
    const response = await api.get('/diagnostic/appointments', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/diagnostic/appointment', appointmentData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateMachineStatus = async (machineId, statusData) => {
  try {
    const response = await api.patch(`/diagnostic/machine/${machineId}/status`, statusData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMachines = async () => {
  try {
    const response = await api.get('/diagnostic/machines', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};