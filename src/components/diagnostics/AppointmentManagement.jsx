import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { appointmentSchema } from '../../validations/appointmentSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';

const scanTypes = [
  { value: 'mri', label: 'MRI' },
  { value: 'ct', label: 'CT Scan' },
  { value: 'xray', label: 'X-Ray' },
  { value: 'ultrasound', label: 'Ultrasound' },
];

export default function AppointmentManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(appointmentSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Appointment scheduled successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to schedule appointment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Schedule Appointment</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Patient Name"
              register={register('patientName')}
              error={errors.patientName?.message}
            />
            <FormInput
              label="Patient ID"
              register={register('patientId')}
              error={errors.patientId?.message}
            />
            <FormSelect
              label="Scan Type"
              register={register('scanType')}
              error={errors.scanType?.message}
              options={scanTypes}
            />
            <FormInput
              label="Appointment Date"
              type="date"
              register={register('appointmentDate')}
              error={errors.appointmentDate?.message}
            />
            <FormInput
              label="Appointment Time"
              type="time"
              register={register('appointmentTime')}
              error={errors.appointmentTime?.message}
            />
            <FormInput
              label="Contact Number"
              register={register('contactNumber')}
              error={errors.contactNumber?.message}
            />
          </div>
          <FormTextarea
            label="Special Instructions"
            register={register('instructions')}
            error={errors.instructions?.message}
            rows="3"
          />
          <SubmitButton isLoading={isLoading}>Schedule Appointment</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Upcoming Appointments</h2>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">No upcoming appointments</p>
          ) : (
            appointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500">ID: {appointment.patientId}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.appointmentDate} at {appointment.appointmentTime}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">Scan:</span> {appointment.scanType}</p>
                  <p><span className="font-medium">Contact:</span> {appointment.contactNumber}</p>
                  {appointment.instructions && (
                    <p><span className="font-medium">Instructions:</span> {appointment.instructions}</p>
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