import * as yup from 'yup';

export const diagnosticReportSchema = yup.object().shape({
  patientId: yup.string().required('Patient ID is required'),
  scanId: yup.string().required('Scan ID is required'),
  scanDate: yup
    .date()
    .required('Scan date is required')
    .max(new Date(), 'Scan date cannot be in the future'),
  reportDate: yup
    .date()
    .required('Report date is required')
    .min(yup.ref('scanDate'), 'Report date must be after scan date'),
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['draft', 'pending_review', 'finalized'], 'Invalid status'),
  findings: yup.string().required('Findings are required'),
  impression: yup.string().required('Impression is required'),
  recommendations: yup.string(),
});