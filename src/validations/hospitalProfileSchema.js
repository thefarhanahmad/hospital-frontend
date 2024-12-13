import * as yup from 'yup';

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const chargeSchema = yup.object().shape({
  chargeName: yup.string().required('Charge name is required'),
  timing: yup.string().required('Timing is required'),
  price: yup.number().required('Price is required').min(0, 'Price must be positive'),
});

const doctorTimingSchema = yup.object().shape({
  doctorName: yup.string().required('Doctor name is required'),
  shift: yup.object().shape({
    start: yup.string().matches(timeRegex, 'Invalid time format (HH:mm)').required('Start time is required'),
    end: yup.string().matches(timeRegex, 'Invalid time format (HH:mm)').required('End time is required'),
  }),
});

export const hospitalProfileSchema = yup.object().shape({
  name: yup.string().required('Hospital name is required'),
  cmoNumber: yup.string().required('CMO number is required'),
  hospitalImages: yup.array().of(yup.mixed()),
  insuranceServices: yup.object().shape({
    tps: yup.array().of(yup.string()),
    ayushmanBharat: yup.object().shape({
      enabled: yup.boolean(),
      specialties: yup.array().of(yup.string()),
      beds: yup.number().min(0),
    }),
    cghs: yup.object().shape({
      enabled: yup.boolean(),
      specialties: yup.array().of(yup.string()),
      beds: yup.number().min(0),
    }),
  }),
  ownershipInformation: yup.object().shape({
    enabled: yup.boolean(),
    ownershipType: yup.string().when('enabled', {
      is: true,
      then: yup.string().required('Ownership type is required'),
    }),
    customDetails: yup.string(),
  }),
  registrationBasis: yup.string().required('Registration basis is required'),
  chargesOverview: yup.array().of(chargeSchema),
  doctorAvailability: yup.object().shape({
    availableDoctors: yup.array().of(
      yup.object().shape({
        name: yup.string().required('Doctor name is required'),
        status: yup.string().oneOf(['available', 'not-available']),
      })
    ),
    onCallDoctors: yup.number().min(0),
    permanentDoctors: yup.number().min(0),
    doctorDutyTimings: yup.array().of(doctorTimingSchema),
  }),
});