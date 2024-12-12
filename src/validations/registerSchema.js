import * as yup from 'yup';
import { ROLES, GENDERS } from '../config/constants';

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter and one number'
    ),
  role: yup
    .string()
    .required('Role is required')
    .oneOf(Object.values(ROLES), 'Invalid role'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Invalid phone number'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(Object.values(GENDERS), 'Invalid gender'),
  address: yup.string().required('Address is required'),
});