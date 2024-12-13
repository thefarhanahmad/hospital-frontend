import * as yup from 'yup';

export const patientAdmissionSchema = yup.object().shape({
  patientName: yup.string().required('Patient name is required'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be a whole number'),
  wardType: yup
    .string()
    .required('Ward type is required')
    .oneOf(['general', 'icu', 'emergency'], 'Invalid ward type'),
  bedNumber: yup.string().required('Bed number is required'),
  medicalCondition: yup.string().required('Medical condition is required'),
  specialInstructions: yup.string(),
});