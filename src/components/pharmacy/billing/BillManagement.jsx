import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { billSchema } from '../../../validations/billSchema';
import { generateBill } from '../../../services/pharmacyService';
import FormInput from '../../forms/FormInput';
import FormSelect from '../../forms/FormSelect';
import SubmitButton from '../../forms/SubmitButton';
import BillItemsSection from './BillItemsSection';
import BillSummarySection from './BillSummarySection';

const paymentMethods = [
  { value: 'cash', label: 'Cash' },
  { value: 'card', label: 'Card' },
  { value: 'upi', label: 'UPI' },
];

export default function BillManagement() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(billSchema),
    defaultValues: {
      items: [{ inventory: '', quantity: 1, price: 0, discount: 0 }],
      subtotal: 0,
      tax: 0,
      totalDiscount: 0,
      total: 0,
      status: 'pending',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await generateBill(data);
      
      // Handle PDF download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bill-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Bill generated successfully!');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to generate bill');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Generate Bill</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Patient ID"
              id="patient"
              register={register('patient')}
              error={errors.patient?.message}
            />
            <FormInput
              label="Prescription ID"
              id="prescription"
              register={register('prescription')}
              error={errors.prescription?.message}
            />
          </div>

          <BillItemsSection
            control={control}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect
              label="Payment Method"
              id="paymentMethod"
              register={register('paymentMethod')}
              error={errors.paymentMethod?.message}
              options={paymentMethods}
            />
            <BillSummarySection watch={watch} />
          </div>

          <SubmitButton isLoading={isLoading}>Generate Bill</SubmitButton>
        </form>
      </div>
    </div>
  );
}