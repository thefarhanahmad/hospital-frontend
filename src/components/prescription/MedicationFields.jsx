import { useFieldArray } from "react-hook-form";
import FormInput from "../forms/FormInput";
import FormTextarea from "../forms/FormTextarea";

export default function MedicationFields({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medications",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Medications</h3>
        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              dosage: "",
              frequency: "",
              duration: "",
              instructions: "",
            })
          }
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100"
        >
          Add Medication
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Medication #{index + 1}</h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Name"
              id={`medications.${index}.name`}
              register={register(`medications.${index}.name`)}
              error={errors.medications?.[index]?.name?.message}
            />
            <FormInput
              label="Dosage"
              id={`medications.${index}.dosage`}
              register={register(`medications.${index}.dosage`)}
              error={errors.medications?.[index]?.dosage?.message}
            />
            <FormInput
              label="Frequency"
              id={`medications.${index}.frequency`}
              register={register(`medications.${index}.frequency`)}
              error={errors.medications?.[index]?.frequency?.message}
            />
            <FormInput
              label="Duration"
              id={`medications.${index}.duration`}
              register={register(`medications.${index}.duration`)}
              error={errors.medications?.[index]?.duration?.message}
            />
          </div>

          <FormTextarea
            label="Instructions"
            id={`medications.${index}.instructions`}
            register={register(`medications.${index}.instructions`)}
            error={errors.medications?.[index]?.instructions?.message}
            rows="2"
          />
        </div>
      ))}
    </div>
  );
}
