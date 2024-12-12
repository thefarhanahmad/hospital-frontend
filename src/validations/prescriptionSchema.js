import * as yup from 'yup';

const medicationSchema = yup.object().shape({
  name: yup.string().required('Medication name is required'),
  dosage: yup.string().required('Dosage is required'),
  frequency: yup.string().required('Frequency is required'),
  duration: yup.string().required('Duration is required'),
  instructions: yup.string().required('Instructions are required'),
});

const testSchema = yup.object().shape({
  name: yup.string().required('Test name is required'),
  instructions: yup.string().required('Instructions are required'),
});

export const prescriptionSchema = yup.object().shape({
  patient: yup.string().required('Patient ID is required'),
  consultation: yup.string().required('Consultation ID is required'),
  diagnosis: yup.string().required('Diagnosis is required'),
  medications: yup
    .array()
    .of(medicationSchema)
    .min(1, 'At least one medication is required'),
  tests: yup.array().of(testSchema),
  advice: yup.string().required('General advice is required'),
  followUp: yup
    .date()
    .required('Follow-up date is required')
    .min(new Date(), 'Follow-up date cannot be in the past'),
  validUntil: yup
    .date()
    .required('Validity date is required')
    .min(yup.ref('followUp'), 'Validity date must be after follow-up date'),
});