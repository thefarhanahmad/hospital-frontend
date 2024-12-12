import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { consultationSchema } from "../../validations/consultationSchema";
import { createConsultation } from "../../services/consultationService";
import FormInput from "../forms/FormInput";
import FormSelect from "../forms/FormSelect";
import FormTextarea from "../forms/FormTextarea";
import SubmitButton from "../forms/SubmitButton";

const consultationTypes = [
  { value: "video", label: "Video Consultation" },
  { value: "in-person", label: "In-Person Consultation" },
];

const commonSymptoms = [
  // { value: "fever", label: "Fever" },
  // { value: "cough", label: "Cough" },
  // { value: "fatigue", label: "Fatigue" },
  // { value: "headache", label: "Headache" },
  // { value: "bodyache", label: "Body Ache" },
  // { value: "nausea", label: "Nausea" },
  // { value: "dizziness", label: "Dizziness" },
  "hkjk",
  "lkll",
  "jk",
];

export default function ConsultationForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(consultationSchema),
    defaultValues: {
      type: "video",
      duration: 30,
      symptoms: [],
    },
  });

  const consultationType = watch("type");

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);
    try {
      setIsLoading(true);

      // Transform the symptoms array to contain only values
      const formattedData = {
        ...data,
        symptoms: commonSymptoms, // Convert objects to an array of values
      };

      await createConsultation(formattedData);

      toast.success("Consultation scheduled successfully!");
      reset(); // Reset form after successful submission
    } catch (error) {
      toast.error(error.message || "Failed to schedule consultation");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Schedule Consultation</h2>

        <div className="space-y-6">
          <FormInput
            label="Patient ID"
            id="patient"
            register={register("patient")}
            error={errors.patient?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Consultation Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  {consultationTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schedule Date & Time
            </label>
            <Controller
              name="scheduledAt"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  minDate={new Date()}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              )}
            />
            {errors.scheduledAt && (
              <p className="mt-1 text-sm text-red-600">
                {errors.scheduledAt.message}
              </p>
            )}
          </div>

          <FormInput
            label="Duration (minutes)"
            id="duration"
            type="number"
            min="15"
            max="120"
            register={register("duration")}
            error={errors.duration?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symptoms
            </label>
            <Controller
              name="symptoms"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={commonSymptoms}
                  className="mt-1"
                  classNamePrefix="select"
                  onChange={(selectedOptions) =>
                    field.onChange(selectedOptions)
                  }
                  value={field.value} // Ensure the value is properly updated
                />
              )}
            />
            {errors.symptoms && (
              <p className="mt-1 text-sm text-red-600">
                {errors.symptoms.message}
              </p>
            )}
          </div>

          {consultationType === "video" && (
            <FormInput
              label="Meeting Link"
              id="meetingLink"
              register={register("meetingLink")}
              error={errors.meetingLink?.message}
            />
          )}

          <FormTextarea
            label="Additional Notes"
            id="notes"
            register={register("notes")}
            error={errors.notes?.message}
            rows="3"
          />
        </div>
      </div>

      <SubmitButton isLoading={isLoading}>Schedule Consultation</SubmitButton>
    </form>
  );
}
