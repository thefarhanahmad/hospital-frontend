import * as yup from 'yup';

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const phoneRegex = /^\d{10}$/;

export const pathologyProfileSchema = yup.object().shape({
  name: yup.string().required('Laboratory name is required'),
  licenseNumber: yup.string().required('License number is required'),
  licenseType: yup
    .string()
    .required('License type is required')
    .oneOf(['government', 'private', 'trust'], 'Invalid license type'),
  licenseExpiry: yup
    .date()
    .required('License expiry date is required')
    .min(new Date(), 'License expiry date must be in the future'),
  facilityType: yup
    .string()
    .required('Facility type is required')
    .oneOf(['collection', 'testing', 'both'], 'Invalid facility type'),
  labImages: yup.mixed(),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(phoneRegex, 'Invalid phone number'),
  emergencyContact: yup
    .string()
    .required('Emergency contact is required')
    .matches(phoneRegex, 'Invalid phone number'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
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
  nablCertificate: yup.string().required('NABL certificate number is required'),
  nablValidity: yup
    .date()
    .required('NABL validity date is required')
    .min(new Date(), 'NABL validity date must be in the future'),
  isoCertificate: yup.string(),
  isoValidity: yup
    .date()
    .nullable()
    .when('isoCertificate', {
      is: (value) => value && value.length > 0,
      then: yup
        .date()
        .required('ISO validity date is required')
        .min(new Date(), 'ISO validity date must be in the future'),
    }),
});