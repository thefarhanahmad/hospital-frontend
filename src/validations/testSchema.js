import * as yup from 'yup';

export const testSchema = yup.object().shape({
  name: yup.string().required('Test name is required'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(
      ['hematology', 'biochemistry', 'microbiology', 'immunology', 'pathology'],
      'Invalid category'
    ),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
  turnaroundTime: yup
    .number()
    .required('Turnaround time is required')
    .positive('Turnaround time must be positive')
    .integer('Turnaround time must be a whole number'),
  sampleRequirements: yup.string().required('Sample requirements are required'),
  specialInstructions: yup.string(),
});