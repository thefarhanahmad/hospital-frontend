import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';

export default function InsuranceSection({ register, control, errors }) {
  const { fields: tpsFields, append: appendTps, remove: removeTps } = useFieldArray({
    control,
    name: 'insuranceServices.tps',
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-6">Insurance Services</h3>

      {/* TPS Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium">Third Party Services</h4>
          <button
            type="button"
            onClick={() => appendTps('')}
            className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100"
          >
            Add TPS
          </button>
        </div>
        {tpsFields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <FormInput
              register={register(`insuranceServices.tps.${index}`)}
              error={errors.insuranceServices?.tps?.[index]?.message}
            />
            <button
              type="button"
              onClick={() => removeTps(index)}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Ayushman Bharat Section */}
      <div className="mb-6">
        <h4 className="font-medium mb-4">Ayushman Bharat</h4>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="ayushmanBharatEnabled"
              {...register('insuranceServices.ayushmanBharat.enabled')}
              className="h-4 w-4 text-indigo-600 rounded"
            />
            <label htmlFor="ayushmanBharatEnabled" className="ml-2">
              Enable Ayushman Bharat
            </label>
          </div>
          <FormInput
            label="Number of Beds"
            type="number"
            register={register('insuranceServices.ayushmanBharat.beds')}
            error={errors.insuranceServices?.ayushmanBharat?.beds?.message}
          />
        </div>
      </div>

      {/* CGHS Section */}
      <div>
        <h4 className="font-medium mb-4">CGHS</h4>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="cghsEnabled"
              {...register('insuranceServices.cghs.enabled')}
              className="h-4 w-4 text-indigo-600 rounded"
            />
            <label htmlFor="cghsEnabled" className="ml-2">
              Enable CGHS
            </label>
          </div>
          <FormInput
            label="Number of Beds"
            type="number"
            register={register('insuranceServices.cghs.beds')}
            error={errors.insuranceServices?.cghs?.beds?.message}
          />
        </div>
      </div>
    </div>
  );
}