import * as yup from 'yup';

export const bloodInventorySchema = yup.object().shape({
  bloodGroup: yup
    .string()
    .required('Blood group is required')
    .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 'Invalid blood group'),
  units: yup
    .number()
    .required('Units is required')
    .positive('Units must be positive')
    .integer('Units must be a whole number'),
  collectionDate: yup
    .date()
    .required('Collection date is required')
    .max(new Date(), 'Collection date cannot be in the future'),
  expiryDate: yup
    .date()
    .required('Expiry date is required')
    .min(yup.ref('collectionDate'), 'Expiry date must be after collection date'),
});