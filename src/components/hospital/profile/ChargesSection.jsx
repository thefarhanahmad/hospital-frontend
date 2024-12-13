import { useFieldArray } from 'react-hook-form';
import FormInput from '../../forms/FormInput';

export default function ChargesSection({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'chargesOverview',
  });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Charges Overview</h3>
        <button
          type="button"
          onClick={() => append({ chargeName: '', timing: '', price: '' })}
          className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100"
        >
          Add Charge
        </button>
      </div>

      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Charge #{index + 1}</h4>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label="Charge Name"
                register={register(`chargesOverview.${index}.chargeName`)}
                error={errors.chargesOverview?.[index]?.chargeName?.message}
              />
              <FormInput
                label="Timing"
                register={register(`chargesOverview.${index}.timing`)}
                error={errors.chargesOverview?.[index]?.timing?.message}
              />
              <FormInput
                label="Price"
                type="number"
                register={register(`chargesOverview.${index}.price`)}
                error={errors.chargesOverview?.[index]?.price?.message}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}