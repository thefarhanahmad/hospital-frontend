import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';
import FormTextarea from '../../forms/FormTextarea';

export default function ImagesSection({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images'
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Images</h3>
        <button
          type="button"
          onClick={() => append({ url: '', description: '', uploadedAt: new Date().toISOString() })}
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100"
        >
          Add Image
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Image #{index + 1}</h4>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <FormInput
                label="Image URL"
                register={register(`images.${index}.url`)}
                error={errors.images?.[index]?.url?.message}
              />
              <FormTextarea
                label="Description"
                register={register(`images.${index}.description`)}
                error={errors.images?.[index]?.description?.message}
                rows="2"
              />
              <FormInput
                label="Upload Date"
                type="datetime-local"
                register={register(`images.${index}.uploadedAt`)}
                error={errors.images?.[index]?.uploadedAt?.message}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}