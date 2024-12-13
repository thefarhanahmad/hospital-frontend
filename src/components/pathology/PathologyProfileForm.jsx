import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { pathologyProfileSchema } from '../../validations/pathologyProfileSchema';
import { updatePathologyProfile } from '../../services/pathologyService';
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
  { value: 'collection', label: 'Collection Center' },
  { value: 'testing', label: 'Testing Center' },
  { value: 'both', label: 'Collection & Testing' },
];

export default function PathologyProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(pathologyProfileSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Handle file uploads
      if (data.labImages?.length) {
        Array.from(data.labImages).forEach((file) => {
          formData.append('labImages', file);
        });
      }

      // Append other data as JSON
      const profileData = { ...data };
      delete profileData.labImages;
      formData.append('data', JSON.stringify(profileData));

      await updatePathologyProfile(formData);
      toast.success('Pathology profile updated successfully!');
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
            label="Laboratory Name"
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
            label="Laboratory Images"
            id="labImages"
            register={register('labImages')}
            error={errors.labImages?.message}
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
        <h3 className="text-lg font-medium mb-6">Accreditation Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="NABL Certificate Number"
            id="nablCertificate"
            register={register('nablCertificate')}
            error={errors.nablCertificate?.message}
          />
          <FormInput
            label="NABL Validity"
            id="nablValidity"
            type="date"
            register={register('nablValidity')}
            error={errors.nablValidity?.message}
          />
          <FormInput
            label="ISO Certificate Number"
            id="isoCertificate"
            register={register('isoCertificate')}
            error={errors.isoCertificate?.message}
          />
          <FormInput
            label="ISO Validity"
            id="isoValidity"
            type="date"
            register={register('isoValidity')}
            error={errors.isoValidity?.message}
          />
        </div>
      </div>

      <SubmitButton isLoading={isLoading}>Update Profile</SubmitButton>
    </form>
  );
}