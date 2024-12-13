import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { doctorProfileSchema } from '../../../validations/doctorProfileSchema';
import { updateDoctorProfile } from '../../../services/doctorService';
import FormInput from '../../forms/FormInput';
import FormFileInput from '../../forms/FormFileInput';
import SubmitButton from '../../forms/SubmitButton';
import PersonalInfoSection from './PersonalInfoSection';
import ClinicInfoSection from './ClinicInfoSection';
import DocumentsSection from './DocumentsSection';

export default function DoctorProfileForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(doctorProfileSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Handle file uploads
      const fileFields = [
        'tenthMarksheet',
        'twelfthMarksheet',
        'degreeCertificate',
        'doctorPhotograph',
        'firstYearMarksheet',
        'secondYearMarksheet',
        'thirdYearMarksheet',
        'fourthYearMarksheet',
        'fifthYearMarksheet',
        'mciRegistration',
        'clinicPhotographs',
      ];

      fileFields.forEach((field) => {
        if (data[field]?.[0]) {
          formData.append(field, data[field][0]);
        }
      });

      // Append other data
      const profileData = { ...data };
      fileFields.forEach((field) => delete profileData[field]);
      formData.append('data', JSON.stringify(profileData));

      await updateDoctorProfile(formData);
      toast.success('Profile updated successfully!');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <PersonalInfoSection register={register} errors={errors} />
      <ClinicInfoSection register={register} errors={errors} />
      <DocumentsSection register={register} errors={errors} />
      <SubmitButton isLoading={isLoading}>Update Profile</SubmitButton>
    </form>
  );
}