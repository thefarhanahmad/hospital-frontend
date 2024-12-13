import * as yup from 'yup';

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
const phoneRegex = /^\d{10}$/;

export const diagnosticsProfileSchema = yup.object().shape({
  name: yup.string().required('Center name is required'),
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
    .oneOf(['imaging', 'diagnostic', 'both'], 'Invalid facility type'),
  centerImages: yup.mixed(),
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
  aerbCertificate: yup.string().required('AERB certificate number is required'),
  aerbValidity: yup
    .date()
    .required('AERB validity date is required')
    .min(new Date(), 'AERB validity date must be in the future'),
  nabhCertificate: yup.string().required('NABH certificate number is required'),
  nabhValidity: yup
    .date()
    .required('NABH validity date is required')
    .min(new Date(), 'NABH validity date must be in the future'),
});