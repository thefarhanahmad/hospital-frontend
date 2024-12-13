import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { admitPatient } from '../../services/hospitalService';
import { patientAdmissionSchema } from '../../validations/patientAdmissionSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';

const wardTypes = [
  { value: 'general', label: 'General Ward' },
  { value: 'icu', label: 'ICU' },
  { value: 'emergency', label: 'Emergency' },
];

export default function PatientAdmissionForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(patientAdmissionSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await admitPatient(data);
      toast.success('Patient admitted successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to admit patient');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Patient Admission Form</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Patient Name"
            id="patientName"
            register={register('patientName')}
            error={errors.patientName?.message}
          />
          
          <FormInput
            label="Age"
            id="age"
            type="number"
            register={register('age')}
            error={errors.age?.message}
          />

          <FormSelect
            label="Ward Type"
            id="wardType"
            register={register('wardType')}
            error={errors.wardType?.message}
            options={wardTypes}
          />

          <FormInput
            label="Bed Number"
            id="bedNumber"
            register={register('bedNumber')}
            error={errors.bedNumber?.message}
          />
        </div>

        <FormTextarea
          label="Medical Condition"
          id="medicalCondition"
          register={register('medicalCondition')}
          error={errors.medicalCondition?.message}
          rows="3"
        />

        <FormTextarea
          label="Special Instructions"
          id="specialInstructions"
          register={register('specialInstructions')}
          error={errors.specialInstructions?.message}
          rows="3"
        />

        <SubmitButton isLoading={isLoading}>Admit Patient</SubmitButton>
      </div>
    </form>
  );
}