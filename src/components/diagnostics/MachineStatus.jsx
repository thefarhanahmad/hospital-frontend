import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { machineStatusSchema } from '../../validations/machineStatusSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';

const machineTypes = [
  { value: 'mri', label: 'MRI Scanner' },
  { value: 'ct', label: 'CT Scanner' },
  { value: 'xray', label: 'X-Ray Machine' },
  { value: 'ultrasound', label: 'Ultrasound Machine' },
];

const statusOptions = [
  { value: 'operational', label: 'Operational' },
  { value: 'maintenance', label: 'Under Maintenance' },
  { value: 'repair', label: 'Needs Repair' },
  { value: 'offline', label: 'Offline' },
];

export default function MachineStatus() {
  const [isLoading, setIsLoading] = useState(false);
  const [machines, setMachines] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(machineStatusSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Machine status updated successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to update machine status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Update Machine Status</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Machine Type"
              register={register('machineType')}
              error={errors.machineType?.message}
              options={machineTypes}
            />
            <FormInput
              label="Machine ID"
              register={register('machineId')}
              error={errors.machineId?.message}
            />
            <FormSelect
              label="Status"
              register={register('status')}
              error={errors.status?.message}
              options={statusOptions}
            />
            <FormInput
              label="Next Service Date"
              type="date"
              register={register('nextServiceDate')}
              error={errors.nextServiceDate?.message}
            />
          </div>
          <FormTextarea
            label="Notes"
            register={register('notes')}
            error={errors.notes?.message}
            rows="3"
          />
          <SubmitButton isLoading={isLoading}>Update Status</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Machine Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {machines.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No machines registered</p>
          ) : (
            machines.map((machine) => (
              <div key={machine.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{machine.type}</h3>
                    <p className="text-sm text-gray-500">ID: {machine.machineId}</p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    machine.status === 'operational'
                      ? 'bg-green-100 text-green-800'
                      : machine.status === 'maintenance'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {machine.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">Next Service:</span> {machine.nextServiceDate}</p>
                  {machine.notes && (
                    <p className="mt-2"><span className="font-medium">Notes:</span> {machine.notes}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}