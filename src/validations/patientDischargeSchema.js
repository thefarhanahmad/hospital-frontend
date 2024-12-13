import * as yup from 'yup';

export const patientDischargeSchema = yup.object().shape({
  patientId: yup.string().required('Patient ID is required'),
  dischargeDate: yup
    .date()
    .required('Discharge date is required')
    .max(new Date(), 'Discharge date cannot be in the future'),
  dischargeSummary: yup.string().required('Discharge summary is required'),
  followUpInstructions: yup.string().required('Follow-up instructions are required'),
});