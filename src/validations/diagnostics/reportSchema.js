import * as yup from 'yup';

const imageSchema = yup.object().shape({
  url: yup.string().required('Image URL is required'),
  description: yup.string().required('Image description is required'),
  uploadedAt: yup.date().required('Upload date is required')
});

export const reportSchema = yup.object().shape({
  test: yup.string().required('Test ID is required'),
  patient: yup.string().required('Patient ID is required'),
  radiologist: yup.string().required('Radiologist ID is required'),
  performedAt: yup
    .date()
    .required('Performance date is required')
    .max(new Date(), 'Performance date cannot be in the future'),
  findings: yup.object().shape({
    description: yup.string().required('Description is required'),
    observations: yup.array().of(yup.string()).min(1, 'At least one observation is required'),
    impressions: yup.array().of(yup.string()).min(1, 'At least one impression is required')
  }),
  images: yup.array().of(imageSchema),
  conclusion: yup.string().required('Conclusion is required'),
  recommendations: yup.array().of(yup.string()),
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['in-progress', 'completed', 'cancelled'], 'Invalid status')
});