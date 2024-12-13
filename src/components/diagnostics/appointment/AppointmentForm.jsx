import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { appointmentSchema } from '../../../validations/diagnostics/appointmentSchema';
import { createAppointment } from '../../../services/diagnosticsService';
import FormInput from '../../forms/FormInput';
import FormSelect from '../../forms/FormSelect';
import FormTextarea from '../../forms/FormTextarea';
import SubmitButton from '../../forms/SubmitButton';
import PreparationInstructionsSection from './PreparationInstructionsSection';

const categoryOptions = [
  { value: 'radiology', label: 'Radiology' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'neurology', label: 'Neurology' },
];

const turnaroundUnits = [
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
];

export default function AppointmentForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(appointmentSchema),
    defaultValues: {
      preparationInstructions: [],
      turnaroundTime: {
        value: 1,
        unit: 'days'
      },
      active: true,
      discountPercentage: 0
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await createAppointment(data);
      toast.success('Appointment scheduled successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to schedule appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Schedule Test/Scan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Test Name"
            register={register('name')}
            error={errors.name?.message}
          />
          
          <FormSelect
            label="Category"
            register={register('category')}
            error={errors.category?.message}
            options={categoryOptions}
          />

          <FormInput
            label="Base Price"
            type="number"
            register={register('basePrice')}
            error={errors.basePrice?.message}
          />

          <FormInput
            label="Discount Percentage"
            type="number"
            register={register('discountPercentage')}
            error={errors.discountPercentage?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Turnaround Value"
              type="number"
              register={register('turnaroundTime.value')}
              error={errors.turnaroundTime?.value?.message}
            />
            <FormSelect
              label="Unit"
              register={register('turnaroundTime.unit')}
              error={errors.turnaroundTime?.unit?.message}
              options={turnaroundUnits}
            />
          </div>

          <FormInput
            label="Equipment ID"
            register={register('equipment')}
            error={errors.equipment?.message}
          />
        </div>

        <div className="mt-6">
          <FormTextarea
            label="Description"
            register={register('description')}
            error={errors.description?.message}
            rows="3"
          />
        </div>

        <PreparationInstructionsSection
          control={control}
          register={register}
          errors={errors}
        />

        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            id="active"
            {...register('active')}
            className="h-4 w-4 text-indigo-600 rounded"
          />
          <label htmlFor="active" className="ml-2 text-sm text-gray-700">
            Active and Available for Booking
          </label>
          {errors.active && (
            <p className="mt-1 text-sm text-red-600">{errors.active.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton isLoading={isLoading}>Schedule Test</SubmitButton>
      </div>
    </form>
  );
}