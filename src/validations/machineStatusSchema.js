import * as yup from 'yup';

export const machineStatusSchema = yup.object().shape({
  machineType: yup
    .string()
    .required('Machine type is required')
    .oneOf(['mri', 'ct', 'xray', 'ultrasound'], 'Invalid machine type'),
  machineId: yup.string().required('Machine ID is required'),
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['operational', 'maintenance', 'repair', 'offline'], 'Invalid status'),
  nextServiceDate: yup
    .date()
    .required('Next service date is required')
    .min(new Date(), 'Next service date must be in the future'),
  notes: yup.string(),
});