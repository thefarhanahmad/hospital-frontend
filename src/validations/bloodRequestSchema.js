import * as yup from 'yup';

export const bloodRequestSchema = yup.object().shape({
  patientName: yup.string().required('Patient name is required'),
  hospital: yup.string().required('Hospital name is required'),
  bloodGroup: yup
    .string()
    .required('Blood group is required')
    .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Invalid blood group'),
  units: yup
    .number()
    .required('Units is required')
    .positive('Units must be positive')
    .integer('Units must be a whole number'),
  requestType: yup
    .string()
    .required('Request type is required')
    .oneOf(['emergency', 'planned'], 'Invalid request type'),
  requiredDate: yup
    .date()
    .required('Required date is required')
    .min(new Date(), 'Required date cannot be in the past'),
  purpose: yup.string().required('Purpose is required'),
});