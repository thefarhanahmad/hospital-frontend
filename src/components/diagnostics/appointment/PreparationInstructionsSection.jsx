import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';

export default function PreparationInstructionsSection({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'preparationInstructions'
  });

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Preparation Instructions</h3>
        <button
          type="button"
          onClick={() => append('')}
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100"
        >
          Add Instruction
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <FormInput
              register={register(`preparationInstructions.${index}`)}
              error={errors.preparationInstructions?.[index]?.message}
              placeholder="Enter preparation instruction"
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