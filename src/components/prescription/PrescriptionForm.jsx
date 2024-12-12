import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { prescriptionSchema } from "../../validations/prescriptionSchema";
import { createPrescription } from "../../services/prescriptionService";
import FormInput from "../forms/FormInput";
import FormTextarea from "../forms/FormTextarea";
import SubmitButton from "../forms/SubmitButton";
import MedicationFields from "./MedicationFields";
import TestFields from "./TestFields";

export default function PrescriptionForm({ consultationId, patientId }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(prescriptionSchema),
    defaultValues: {
      patient: patientId,
      consultation: consultationId,
      medications: [
        {
          name: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
      tests: [],
    },
  });

  const onSubmit = async (data) => {
    console.log("buton clicked")
    try {
      setIsLoading(true);
      const res = await createPrescription(data);
      console.log("res : ", res);
      toast.success("Prescription created successfully!");
      reset();
    } catch (error) {
      toast.error(error.message || "Failed to create prescription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Create Prescription</h2>

        <div className="space-y-6">
          <FormInput
            label="Patient ID"
            id="patient"
            register={register("patient")}
            error={errors.patient?.message}
          />

          <FormInput
            label="Consultation ID"
            id="consultation"
            register={register("consultation")}
            error={errors.consultation?.message}
          />

          <FormInput
            label="Diagnosis"
            id="diagnosis"
            register={register("diagnosis")}
            error={errors.diagnosis?.message}
          />

          <MedicationFields
            control={control}
            register={register}
            errors={errors}
          />

          <TestFields control={control} register={register} errors={errors} />

          <FormTextarea
            label="General Advice"
            id="advice"
            register={register("advice")}
            error={errors.advice?.message}
            rows="3"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Follow-up Date
              </label>
              {/* <DatePicker
                selected={watch("followUp")}
                onChange={(date) => setValue("followUp", date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.followUp && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.followUp.message}
                </p>
              )} */}
              <input type="date" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid Until
              </label>
              {/* <DatePicker
                selected={watch("validUntil")}
                onChange={(date) => setValue("validUntil", date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={watch("followUp") || new Date()}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.validUntil && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.validUntil.message}
                </p>
              )} */}
              <input type="date" />
            </div>
          </div>
        </div>
      </div>

      <SubmitButton isLoading={isLoading}>Create Prescription</SubmitButton>
    </form>
  );
}
