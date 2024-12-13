import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { pharmacyProfileSchema } from '../../validations/pharmacyProfileSchema';
import { updatePharmacyProfile } from '../../services/pharmacyService';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormFileInput from '../forms/FormFileInput';
import SubmitButton from '../forms/SubmitButton';

const ownershipTypes = [
  { value: 'individual', label: 'Individual' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'corporate', label: 'Corporate' },
];

const licenseTypes = [
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'both', label: 'Both' },
];

export default function PharmacyProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(pharmacyProfileSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Handle file uploads
      if (data.pharmacyImages?.length) {
        Array.from(data.pharmacyImages).forEach((file) => {
          formData.append('pharmacyImages', file);
        });
      }

      // Append other data as JSON
      const profileData = { ...data };
      delete profileData.pharmacyImages;
      formData.append('data', JSON.stringify(profileData));

      await updatePharmacyProfile(formData);
      toast.success('Pharmacy profile updated successfully!');
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
            label="Pharmacy Name"
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
            label="Ownership Type"
            id="ownershipType"
            register={register('ownershipType')}
            error={errors.ownershipType?.message}
            options={ownershipTypes}
          />
          <FormFileInput
            label="Pharmacy Images"
            id="pharmacyImages"
            register={register('pharmacyImages')}
            error={errors.pharmacyImages?.message}
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
          <FormInput
            label="GST Number"
            id="gstNumber"
            register={register('gstNumber')}
            error={errors.gstNumber?.message}
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

      <SubmitButton isLoading={isLoading}>Update Profile</SubmitButton>
    </form>
  );
}