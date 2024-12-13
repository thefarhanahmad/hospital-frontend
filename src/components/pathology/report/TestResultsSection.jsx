import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';

export default function TestResultsSection({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'testResults',
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Test Results</h3>
        <button
          type="button"
          onClick={() => append({ parameter: '', result: '', unit: '', referenceRange: '' })}
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100"
        >
          Add Parameter
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Parameter #{index + 1}</h4>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormInput
              label="Parameter"
              register={register(`testResults.${index}.parameter`)}
              error={errors.testResults?.[index]?.parameter?.message}
            />
            <FormInput
              label="Result"
              register={register(`testResults.${index}.result`)}
              error={errors.testResults?.[index]?.result?.message}
            />
            <FormInput
              label="Unit"
              register={register(`testResults.${index}.unit`)}
              error={errors.testResults?.[index]?.unit?.message}
            />
            <FormInput
              label="Reference Range"
              register={register(`testResults.${index}.referenceRange`)}
              error={errors.testResults?.[index]?.referenceRange?.message}
            />
          </div>
        </div>
      ))}
    </div>
  );
}