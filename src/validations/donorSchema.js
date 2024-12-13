import * as yup from 'yup';

export const donorSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  age: yup
    .number()
    .required('Age is required')
    .min(18, 'Must be at least 18 years old')
    .max(65, 'Must be under 65 years old'),
  bloodGroup: yup
    .string()
    .required('Blood group is required')
    .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Invalid blood group'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Invalid phone number'),
  email: yup.string().email('Invalid email').required('Email is required'),
  lastDonationDate: yup
    .date()
    .nullable()
    .max(new Date(), 'Last donation date cannot be in the future'),
  medicalHistory: yup.string(),
});