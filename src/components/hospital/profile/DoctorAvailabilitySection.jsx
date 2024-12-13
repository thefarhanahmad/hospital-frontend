import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';

export default function DoctorAvailabilitySection({ control, register, errors }) {
  const { fields: doctorFields, append: appendDoctor, remove: removeDoctor } = useFieldArray({
    control,
    name: 'doctorAvailability.availableDoctors',
  });

  const { fields: timingFields, append: appendTiming, remove: removeTiming } = useFieldArray({
    control,
    name: 'doctorAvailability.doctorDutyTimings',
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-6">Doctor Availability</h3>

      <div className="space-y-8">
        {/* Doctor Count Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="On-Call Doctors"
            type="number"
            register={register('doctorAvailability.onCallDoctors')}
            error={errors.doctorAvailability?.onCallDoctors?.message}
          />
          <FormInput
            label="Permanent Doctors"
            type="number"
            register={register('doctorAvailability.permanentDoctors')}
            error={errors.doctorAvailability?.permanentDoctors?.message}
          />
        </div>

        {/* Available Doctors Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Available Doctors</h4>
            <button
              type="button"
              onClick={() => appendDoctor({ name: '', status: 'available' })}
              className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100"
            >
              Add Doctor
            </button>
          </div>

          <div className="space-y-4">
            {doctorFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-medium">Doctor #{index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeDoctor(index)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Doctor Name"
                    register={register(`doctorAvailability.availableDoctors.${index}.name`)}
                    error={errors.doctorAvailability?.availableDoctors?.[index]?.name?.message}
                  />
                  <select
                    {...register(`doctorAvailability.availableDoctors.${index}.status`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="available">Available</option>
                    <option value="not-available">Not Available</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Duty Timings Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Doctor Duty Timings</h4>
            <button
              type="button"
              onClick={() => appendTiming({ doctorName: '', shift: { start: '', end: '' } })}
              className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100"
            >
              Add Timing
            </button>
          </div>

          <div className="space-y-4">
            {timingFields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="font-medium">Timing #{index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => removeTiming(index)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    label="Doctor Name"
                    register={register(`doctorAvailability.doctorDutyTimings.${index}.doctorName`)}
                    error={errors.doctorAvailability?.doctorDutyTimings?.[index]?.doctorName?.message}
                  />
                  <FormInput
                    label="Start Time"
                    type="time"
                    register={register(`doctorAvailability.doctorDutyTimings.${index}.shift.start`)}
                    error={errors.doctorAvailability?.doctorDutyTimings?.[index]?.shift?.start?.message}
                  />
                  <FormInput
                    label="End Time"
                    type="time"
                    register={register(`doctorAvailability.doctorDutyTimings.${index}.shift.end`)}
                    error={errors.doctorAvailability?.doctorDutyTimings?.[index]?.shift?.end?.message}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}