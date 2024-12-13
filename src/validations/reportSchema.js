import * as yup from 'yup';

const testResultSchema = yup.object().shape({
  parameter: yup.string().required('Parameter is required'),
  result: yup.string().required('Result is required'),
  unit: yup.string().required('Unit is required'),
  referenceRange: yup.string().required('Reference range is required'),
});

export const reportSchema = yup.object().shape({
  patientId: yup.string().required('Patient ID is required'),
  sampleId: yup.string().required('Sample ID is required'),
  testId: yup.string().required('Test ID is required'),
  collectionDate: yup
    .date()
    .required('Collection date is required')
    .max(new Date(), 'Collection date cannot be in the future'),
  reportDate: yup
    .date()
    .required('Report date is required')
    .min(yup.ref('collectionDate'), 'Report date must be after collection date'),
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['draft', 'pending_review', 'finalized'], 'Invalid status'),
  testResults: yup
    .array()
    .of(testResultSchema)
    .min(1, 'At least one test result is required'),
  clinicalNotes: yup.string(),
  comments: yup.string(),
});