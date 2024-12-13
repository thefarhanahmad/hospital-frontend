import * as yup from 'yup';

export const medicineSchema = yup.object().shape({
  name: yup.string().required('Medicine name is required'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['tablets', 'syrups', 'injections', 'equipment'], 'Invalid category'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
  expiryDate: yup
    .date()
    .required('Expiry date is required')
    .min(new Date(), 'Expiry date must be in the future'),
  batchNumber: yup.string().required('Batch number is required'),
});