import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';
import FormTextarea from '../../forms/FormTextarea';

export default function FindingsSection({ control, register, errors }) {
  const { fields: observationFields, append: appendObservation, remove: removeObservation } = useFieldArray({
    control,
    name: 'findings.observations'
  });

  const { fields: impressionFields, append: appendImpression, remove: removeImpression } = useFieldArray({
    control,
    name: 'findings.impressions'
  });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <FormTextarea
            label="Description"
            register={register('findings.description')}
            error={errors.findings?.description?.message}
            rows="3"
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Observations</h3>
              <button
                type="button"
                onClick={() => appendObservation('')}
                className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100"
              >
                Add Observation
              </button>
            </div>
            {observationFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <FormInput
                  register={register(`findings.observations.${index}`)}
                  error={errors.findings?.observations?.[index]?.message}
                />
                <button
                  type="button"
                  onClick={() => removeObservation(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Impressions</h3>
              <button
                type="button"
                onClick={() => appendImpression('')}
                className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100"
              >
                Add Impression
              </button>
            </div>
            {impressionFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <FormInput
                  register={register(`findings.impressions.${index}`)}
                  error={errors.findings?.impressions?.[index]?.message}
                />
                <button
                  type="button"
                  onClick={() => removeImpression(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}