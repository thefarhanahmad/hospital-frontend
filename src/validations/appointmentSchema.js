import * as yup from 'yup';

const phoneRegex = /^\d{10}$/;

export const appointmentSchema = yup.object().shape({
  patientName: yup.string().required('Patient name is required'),
  patientId: yup.string().required('Patient ID is required'),
  scanType: yup
    .string()
    .required('Scan type is required')
    .oneOf(['mri', 'ct', 'xray', 'ultrasound'], 'Invalid scan type'),
  appointmentDate: yup
    .date()
    .required('Appointment date is required')
    .min(new Date(), 'Appointment date cannot be in the past'),
  appointmentTime: yup
    .string()
    .required('Appointment time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  contactNumber: yup
    .string()
    .required('Contact number is required')
    .matches(phoneRegex, 'Invalid phone number'),
  instructions: yup.string(),
});