import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { dischargePatient } from '../../services/hospitalService';
import { patientDischargeSchema } from '../../validations/patientDischargeSchema';
import FormInput from '../forms/FormInput';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';

export default function PatientDischargeForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(patientDischargeSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await dischargePatient(data);
      toast.success('Patient discharged successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to discharge patient');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Patient Discharge Form</h2>
      
      <div className="space-y-6">
        <FormInput
          label="Patient ID"
          id="patientId"
          register={register('patientId')}
          error={errors.patientId?.message}
        />

        <FormInput
          label="Discharge Date"
          id="dischargeDate"
          type="date"
          register={register('dischargeDate')}
          error={errors.dischargeDate?.message}
        />

        <FormTextarea
          label="Discharge Summary"
          id="dischargeSummary"
          register={register('dischargeSummary')}
          error={errors.dischargeSummary?.message}
          rows="4"
        />

        <FormTextarea
          label="Follow-up Instructions"
          id="followUpInstructions"
          register={register('followUpInstructions')}
          error={errors.followUpInstructions?.message}
          rows="3"
        />

        <SubmitButton isLoading={isLoading}>Discharge Patient</SubmitButton>
      </div>
    </form>
  );
}