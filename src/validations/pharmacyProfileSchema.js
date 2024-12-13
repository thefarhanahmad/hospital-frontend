import * as yup from 'yup';

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const phoneRegex = /^\d{10}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

export const pharmacyProfileSchema = yup.object().shape({
  name: yup.string().required('Pharmacy name is required'),
  licenseNumber: yup.string().required('License number is required'),
  licenseType: yup
    .string()
    .required('License type is required')
    .oneOf(['retail', 'wholesale', 'both'], 'Invalid license type'),
  licenseExpiry: yup
    .date()
    .required('License expiry date is required')
    .min(new Date(), 'License expiry date must be in the future'),
  ownershipType: yup
    .string()
    .required('Ownership type is required')
    .oneOf(['individual', 'partnership', 'corporate'], 'Invalid ownership type'),
  pharmacyImages: yup.mixed(),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(phoneRegex, 'Invalid phone number'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  gstNumber: yup
    .string()
    .required('GST number is required')
    .matches(gstRegex, 'Invalid GST number format'),
  openingTime: yup
    .string()
    .matches(timeRegex, 'Invalid time format (HH:mm)')
    .when('is24Hours', {
      is: false,
      then: yup.string().required('Opening time is required'),
    }),
  closingTime: yup
    .string()
    .matches(timeRegex, 'Invalid time format (HH:mm)')
    .when('is24Hours', {
      is: false,
      then: yup.string().required('Closing time is required'),
    }),
  is24Hours: yup.boolean(),
});