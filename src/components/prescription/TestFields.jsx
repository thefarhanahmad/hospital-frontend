import { useFieldArray } from "react-hook-form";
import FormInput from "../forms/FormInput";
import FormTextarea from "../forms/FormTextarea";

export default function TestFields({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tests",
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Medical Tests</h3>
        <button
          type="button"
          onClick={() => append({ name: "", instructions: "" })}
          className="px-3 py-1 text-sm bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100"
        >
          Add Test
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Test #{index + 1}</h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>

          <FormInput
            label="Test Name"
            id={`tests.${index}.name`}
            register={register(`tests.${index}.name`)}
            error={errors.tests?.[index]?.name?.message}
          />

          <FormTextarea
            label="Instructions"
            id={`tests.${index}.instructions`}
            register={register(`tests.${index}.instructions`)}
            error={errors.tests?.[index]?.instructions?.message}
            rows="2"
          />
        </div>
      ))}
    </div>
  );
}
