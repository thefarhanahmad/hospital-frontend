import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { donorSchema } from '../../validations/donorSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';

const bloodGroups = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

export default function DonorManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [donors, setDonors] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(donorSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Donor registered successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to register donor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Register New Donor</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              register={register('name')}
              error={errors.name?.message}
            />
            <FormInput
              label="Age"
              type="number"
              register={register('age')}
              error={errors.age?.message}
            />
            <FormSelect
              label="Blood Group"
              register={register('bloodGroup')}
              error={errors.bloodGroup?.message}
              options={bloodGroups}
            />
            <FormInput
              label="Phone Number"
              register={register('phone')}
              error={errors.phone?.message}
            />
            <FormInput
              label="Email"
              type="email"
              register={register('email')}
              error={errors.email?.message}
            />
            <FormInput
              label="Last Donation Date"
              type="date"
              register={register('lastDonationDate')}
              error={errors.lastDonationDate?.message}
            />
          </div>
          <FormTextarea
            label="Medical History"
            register={register('medicalHistory')}
            error={errors.medicalHistory?.message}
            rows="3"
          />
          <SubmitButton isLoading={isLoading}>Register Donor</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Donor List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Donation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No donors registered
                  </td>
                </tr>
              ) : (
                donors.map((donor) => (
                  <tr key={donor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{donor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{donor.bloodGroup}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{donor.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{donor.lastDonationDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        donor.isEligible
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {donor.isEligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}