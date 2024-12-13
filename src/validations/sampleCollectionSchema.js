import * as yup from 'yup';

const phoneRegex = /^\d{10}$/;

export const sampleCollectionSchema = yup.object().shape({
  patientName: yup.string().required('Patient name is required'),
  patientId: yup.string().required('Patient ID is required'),
  collectionType: yup
    .string()
    .required('Collection type is required')
    .oneOf(['home', 'lab'], 'Invalid collection type'),
  collectionDate: yup
    .date()
    .required('Collection date is required')
    .min(new Date(), 'Collection date cannot be in the past'),
  collectionTime: yup
    .string()
    .required('Collection time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  contactNumber: yup
    .string()
    .required('Contact number is required')
    .matches(phoneRegex, 'Invalid phone number'),
  address: yup.string().when('collectionType', {
    is: 'home',
    then: yup.string().required('Address is required for home collection'),
  }),
  instructions: yup.string(),
});