import * as yup from 'yup';

export const appointmentSchema = yup.object().shape({
  name: yup.string().required('Test name is required'),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['radiology', 'cardiology', 'neurology'], 'Invalid category'),
  description: yup.string().required('Description is required'),
  basePrice: yup
    .number()
    .required('Base price is required')
    .positive('Base price must be positive'),
  discountPercentage: yup
    .number()
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%')
    .default(0),
  preparationInstructions: yup
    .array()
    .of(yup.string().required('Instruction is required'))
    .min(1, 'At least one preparation instruction is required'),
  turnaroundTime: yup.object().shape({
    value: yup
      .number()
      .required('Turnaround time value is required')
      .positive('Turnaround time must be positive')
      .integer('Turnaround time must be a whole number'),
    unit: yup
      .string()
      .required('Turnaround time unit is required')
      .oneOf(['hours', 'days', 'weeks'], 'Invalid time unit'),
  }),
  equipment: yup.string().required('Equipment ID is required'),
  active: yup.boolean().default(true),
});