import * as yup from 'yup';

const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'application/pdf',
];

const fileValidation = yup
  .mixed()
  .required('File is required')
  .test('fileSize', 'File too large (max 5MB)', (value) => {
    if (!value || !value[0]) return true;
    return value[0].size <= FILE_SIZE;
  })
  .test('fileFormat', 'Unsupported file format', (value) => {
    if (!value || !value[0]) return true;
    return SUPPORTED_FORMATS.includes(value[0].type);
  });

export const doctorProfileSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  registrationNumber: yup.string().required('Registration number is required'),
  clinicName: yup.string().required('Clinic name is required'),
  degree: yup.string().required('Degree is required'),
  aadharCardNumber: yup
    .string()
    .required('Aadhar card number is required')
    .matches(/^\d{12}$/, 'Invalid Aadhar card number'),
  mobileNumber: yup
    .string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Invalid mobile number'),
  clinicLocation: yup.string().required('Clinic location is required'),
  latitude: yup.number().required('Latitude is required').min(-90).max(90),
  longitude: yup.number().required('Longitude is required').min(-180).max(180),
  email: yup.string().email('Invalid email').required('Email is required'),
  tenthMarksheet: fileValidation,
  twelfthMarksheet: fileValidation,
  degreeCertificate: fileValidation,
  doctorPhotograph: fileValidation,
  firstYearMarksheet: fileValidation,
  secondYearMarksheet: fileValidation,
  thirdYearMarksheet: fileValidation,
  fourthYearMarksheet: fileValidation,
  fifthYearMarksheet: fileValidation,
  mciRegistration: fileValidation,
  clinicPhotographs: yup.mixed().required('Clinic photographs are required'),
  status: yup.string().oneOf(['pending', 'approved', 'rejected']).default('pending'),
});