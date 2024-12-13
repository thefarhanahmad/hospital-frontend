import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { diagnosticsProfileSchema } from '../../validations/diagnosticsProfileSchema';
import { updateDiagnosticsProfile } from '../../services/diagnosticsService';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormFileInput from '../forms/FormFileInput';
import SubmitButton from '../forms/SubmitButton';

const licenseTypes = [
  { value: 'government', label: 'Government' },
  { value: 'private', label: 'Private' },
  { value: 'trust', label: 'Trust' },
];

const facilityTypes = [
  { value: 'imaging', label: 'Imaging Center' },
  { value: 'diagnostic', label: 'Diagnostic Center' },
  { value: 'both', label: 'Imaging & Diagnostic' },
];

export default function DiagnosticsProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(diagnosticsProfileSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Handle file uploads
      if (data.centerImages?.length) {
        Array.from(data.centerImages).forEach((file) => {
          formData.append('centerImages', file);
        });
      }

      // Append other data as JSON
      const profileData = { ...data };
      delete profileData.centerImages;
      formData.append('data', JSON.stringify(profileData));

      await updateDiagnosticsProfile(formData);
      toast.success('Diagnostics profile updated successfully!');
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
            label="Center Name"
            id="name"
            register={register('name')}
            error={errors.name?.message}
          />
          <FormInput
            label="License Number"
            id="licenseNumber"
            register={register('licenseNumber')}
            error={errors.licenseNumber?.message}
          />
          <FormSelect
            label="License Type"
            id="licenseType"
            register={register('licenseType')}
            error={errors.licenseType?.message}
            options={licenseTypes}
          />
          <FormInput
            label="License Expiry"
            id="licenseExpiry"
            type="date"
            register={register('licenseExpiry')}
            error={errors.licenseExpiry?.message}
          />
          <FormSelect
            label="Facility Type"
            id="facilityType"
            register={register('facilityType')}
            error={errors.facilityType?.message}
            options={facilityTypes}
          />
          <FormFileInput
            label="Center Images"
            id="centerImages"
            register={register('centerImages')}
            error={errors.centerImages?.message}
            multiple
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Phone Number"
            id="phone"
            type="tel"
            register={register('phone')}
            error={errors.phone?.message}
          />
          <FormInput
            label="Emergency Contact"
            id="emergencyContact"
            type="tel"
            register={register('emergencyContact')}
            error={errors.emergencyContact?.message}
          />
          <FormInput
            label="Email"
            id="email"
            type="email"
            register={register('email')}
            error={errors.email?.message}
          />
          <FormInput
            label="Address"
            id="address"
            register={register('address')}
            error={errors.address?.message}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Operating Hours</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Opening Time"
            id="openingTime"
            type="time"
            register={register('openingTime')}
            error={errors.openingTime?.message}
          />
          <FormInput
            label="Closing Time"
            id="closingTime"
            type="time"
            register={register('closingTime')}
            error={errors.closingTime?.message}
          />
          <div className="col-span-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="24hours"
                {...register('is24Hours')}
                className="h-4 w-4 text-indigo-600 rounded"
              />
              <label htmlFor="24hours" className="text-sm text-gray-700">
                Open 24 Hours
              </label>
            </div>
            {errors.is24Hours && (
              <p className="mt-1 text-sm text-red-600">{errors.is24Hours.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Equipment & Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="AERB Certificate Number"
            id="aerbCertificate"
            register={register('aerbCertificate')}
            error={errors.aerbCertificate?.message}
          />
          <FormInput
            label="AERB Validity"
            id="aerbValidity"
            type="date"
            register={register('aerbValidity')}
            error={errors.aerbValidity?.message}
          />
          <FormInput
            label="NABH Certificate Number"
            id="nabhCertificate"
            register={register('nabhCertificate')}
            error={errors.nabhCertificate?.message}
          />
          <FormInput
            label="NABH Validity"
            id="nabhValidity"
            type="date"
            register={register('nabhValidity')}
            error={errors.nabhValidity?.message}
          />
        </div>
      </div>

      <SubmitButton isLoading={isLoading}>Update Profile</SubmitButton>
    </form>
  );
}