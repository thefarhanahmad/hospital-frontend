import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { hospitalProfileSchema } from '../../validations/hospitalProfileSchema';
import { updateHospitalProfile } from '../../services/hospitalService';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormFileInput from '../forms/FormFileInput';
import SubmitButton from '../forms/SubmitButton';
import InsuranceSection from './profile/InsuranceSection';
import ChargesSection from './profile/ChargesSection';
import DoctorAvailabilitySection from './profile/DoctorAvailabilitySection';

const ownershipTypes = [
  { value: 'Trust', label: 'Trust' },
  { value: 'Private', label: 'Private' },
  { value: 'Government', label: 'Government' },
];

const registrationBasisOptions = [
  { value: 'Company', label: 'Company' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Proprietorship', label: 'Proprietorship' },
];

export default function HospitalProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(hospitalProfileSchema),
    defaultValues: {
      insuranceServices: {
        tps: [],
        ayushmanBharat: { enabled: false, specialties: [], beds: 0 },
        cghs: { enabled: false, specialties: [], beds: 0 },
      },
      ownershipInformation: { enabled: false },
      chargesOverview: [],
      doctorAvailability: {
        availableDoctors: [],
        onCallDoctors: 0,
        permanentDoctors: 0,
        doctorDutyTimings: [],
      },
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Handle file uploads
      if (data.hospitalImages?.length) {
        Array.from(data.hospitalImages).forEach((file) => {
          formData.append('hospitalImages', file);
        });
      }

      // Append other data as JSON
      const profileData = { ...data };
      delete profileData.hospitalImages;
      formData.append('data', JSON.stringify(profileData));

      await updateHospitalProfile(formData);
      toast.success('Hospital profile updated successfully!');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Hospital Name"
            id="name"
            register={register('name')}
            error={errors.name?.message}
          />
          <FormInput
            label="CMO Number"
            id="cmoNumber"
            register={register('cmoNumber')}
            error={errors.cmoNumber?.message}
          />
          <FormSelect
            label="Registration Basis"
            id="registrationBasis"
            register={register('registrationBasis')}
            error={errors.registrationBasis?.message}
            options={registrationBasisOptions}
          />
          <FormFileInput
            label="Hospital Images"
            id="hospitalImages"
            register={register('hospitalImages')}
            error={errors.hospitalImages?.message}
            multiple
          />
        </div>
      </div>

      <InsuranceSection
        register={register}
        control={control}
        errors={errors}
      />

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Ownership Information</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ownershipEnabled"
              {...register('ownershipInformation.enabled')}
              className="h-4 w-4 text-indigo-600 rounded"
            />
            <label htmlFor="ownershipEnabled" className="ml-2">
              Enable Ownership Information
            </label>
          </div>

          {errors.ownershipInformation?.enabled && (
            <p className="text-sm text-red-600">
              {errors.ownershipInformation.enabled.message}
            </p>
          )}

          <FormSelect
            label="Ownership Type"
            id="ownershipType"
            register={register('ownershipInformation.ownershipType')}
            error={errors.ownershipInformation?.ownershipType?.message}
            options={ownershipTypes}
          />

          <FormInput
            label="Custom Details"
            id="customDetails"
            register={register('ownershipInformation.customDetails')}
            error={errors.ownershipInformation?.customDetails?.message}
          />
        </div>
      </div>

      <ChargesSection
        control={control}
        register={register}
        errors={errors}
      />

      <DoctorAvailabilitySection
        control={control}
        register={register}
        errors={errors}
      />

      <SubmitButton isLoading={isLoading}>Update Profile</SubmitButton>
    </form>
  );
}