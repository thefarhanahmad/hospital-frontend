import * as yup from 'yup';

export const consultationSchema = yup.object().shape({
  patient: yup.string().required('Patient ID is required'),
  type: yup
    .string()
    .required('Consultation type is required')
    .oneOf(['video', 'in-person'], 'Invalid consultation type'),
  scheduledAt: yup
    .date()
    .required('Schedule date and time is required')
    .min(new Date(), 'Cannot schedule consultation in the past'),
  duration: yup
    .number()
    .required('Duration is required')
    .min(15, 'Minimum duration is 15 minutes')
    .max(120, 'Maximum duration is 120 minutes'),
  symptoms: yup
    .array()
    .of(yup.string())
    .required('At least one symptom is required')
    .min(1, 'At least one symptom is required'),
  notes: yup.string(),
  meetingLink: yup.string().when('type', {
    is: 'video',
    then: (schema) => schema.required('Meeting link is required for video consultation'),
  }),
});