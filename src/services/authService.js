import api from './api';
import { ROUTES } from '../config/constants';

export const register = async (userData) => {
  try {
    const response = await api.post(ROUTES.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post(ROUTES.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};