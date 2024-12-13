import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { bloodRequestSchema } from '../../validations/bloodRequestSchema';
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

const requestTypes = [
  { value: 'emergency', label: 'Emergency' },
  { value: 'planned', label: 'Planned' },
];

export default function RequestManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(bloodRequestSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Blood request submitted successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to submit request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestUpdate = async (requestId, status) => {
    try {
      // API call would go here
      setRequests(requests.map(request =>
        request.id === requestId ? { ...request, status } : request
      ));
      toast.success(`Request ${status}`);
    } catch (error) {
      toast.error('Failed to update request status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">New Blood Request</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Patient Name"
              register={register('patientName')}
              error={errors.patientName?.message}
            />
            <FormInput
              label="Hospital"
              register={register('hospital')}
              error={errors.hospital?.message}
            />
            <FormSelect
              label="Blood Group"
              register={register('bloodGroup')}
              error={errors.bloodGroup?.message}
              options={bloodGroups}
            />
            <FormInput
              label="Units Required"
              type="number"
              register={register('units')}
              error={errors.units?.message}
            />
            <FormSelect
              label="Request Type"
              register={register('requestType')}
              error={errors.requestType?.message}
              options={requestTypes}
            />
            <FormInput
              label="Required Date"
              type="date"
              register={register('requiredDate')}
              error={errors.requiredDate?.message}
            />
          </div>
          <FormTextarea
            label="Purpose"
            register={register('purpose')}
            error={errors.purpose?.message}
            rows="3"
          />
          <SubmitButton isLoading={isLoading}>Submit Request</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Blood Requests</h2>
        <div className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-center text-gray-500">No blood requests</p>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">Request #{request.id}</h3>
                    <p className="text-sm text-gray-500">Patient: {request.patientName}</p>
                    <p className="text-sm text-gray-500">Hospital: {request.hospital}</p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    request.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : request.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium">Blood Group:</span> {request.bloodGroup}
                  </div>
                  <div>
                    <span className="font-medium">Units:</span> {request.units}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {request.requestType}
                  </div>
                  <div>
                    <span className="font-medium">Required Date:</span> {request.requiredDate}
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestUpdate(request.id, 'approved')}
                      className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRequestUpdate(request.id, 'rejected')}
                      className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}