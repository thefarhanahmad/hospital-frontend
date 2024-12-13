import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';

export default function RecommendationsSection({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'recommendations'
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Recommendations</h3>
        <button
          type="button"
          onClick={() => append('')}
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100"
        >
          Add Recommendation
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormInput
              register={register(`recommendations.${index}`)}
              error={errors.recommendations?.[index]?.message}
              placeholder="Enter recommendation"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}