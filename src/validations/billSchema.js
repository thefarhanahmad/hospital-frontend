import * as yup from 'yup';

const billItemSchema = yup.object().shape({
  inventory: yup.string().required('Inventory ID is required'),
  quantity: yup
    .number()
    .required('Quantity is required')
    .positive('Quantity must be positive')
    .integer('Quantity must be a whole number'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
  discount: yup
    .number()
    .min(0, 'Discount cannot be negative')
    .default(0),
});

export const billSchema = yup.object().shape({
  patient: yup.string().required('Patient ID is required'),
  prescription: yup.string().required('Prescription ID is required'),
  items: yup
    .array()
    .of(billItemSchema)
    .min(1, 'At least one item is required'),
  subtotal: yup.number().min(0),
  tax: yup.number().min(0),
  totalDiscount: yup.number().min(0),
  total: yup.number().min(0),
  paymentMethod: yup
    .string()
    .required('Payment method is required')
    .oneOf(['cash', 'card', 'upi'], 'Invalid payment method'),
  status: yup
    .string()
    .oneOf(['pending', 'completed', 'cancelled'], 'Invalid status')
    .default('pending'),
});