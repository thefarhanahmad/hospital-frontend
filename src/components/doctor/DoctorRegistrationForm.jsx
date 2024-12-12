import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { doctorRegistrationSchema } from "../../validations/doctorRegistrationSchema";
import { registerDoctor } from "../../services/doctorService";
import FormInput from "../forms/FormInput";
import FormFileInput from "../forms/FormFileInput";
import SubmitButton from "../forms/SubmitButton";

export default function DoctorRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(doctorRegistrationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      // Append file fields
      const fileFields = [
        "tenthMarksheet",
        "twelfthMarksheet",
        "degreeCertificate",
        "doctorPhotograph",
        "firstYearMarksheet",
        "secondYearMarksheet",
        "thirdYearMarksheet",
        "fourthYearMarksheet",
        "fifthYearMarksheet",
        "mciRegistration",
        "clinicPhotographs",
      ];

      fileFields.forEach((field) => {
        if (data[field]?.[0]) {
          formData.append(field, data[field][0]);
        }
      });

      // Append text fields
      const textFields = [
        "name",
        "registrationNumber",
        "clinicName",
        "degree",
        "aadharCardNumber",
        "mobileNumber",
        "clinicLocation",
        "latitude",
        "longitude",
        "email",
      ];

      textFields.forEach((field) => {
        if (data[field]) {
          formData.append(field, data[field]);
        }
      });

      formData.append("status", "pending");

      const res = await registerDoctor(formData);
      console.log("response : ", res);
      toast.success("Registration details submitted successfully!");
      reset();
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Full Name"
            id="name"
            register={register("name")}
            error={errors.name?.message}
          />
          <FormInput
            label="Registration Number"
            id="registrationNumber"
            register={register("registrationNumber")}
            error={errors.registrationNumber?.message}
          />
          <FormInput
            label="Email"
            id="email"
            type="email"
            register={register("email")}
            error={errors.email?.message}
          />
          <FormInput
            label="Mobile Number"
            id="mobileNumber"
            register={register("mobileNumber")}
            error={errors.mobileNumber?.message}
          />
          <FormInput
            label="Aadhar Card Number"
            id="aadharCardNumber"
            register={register("aadharCardNumber")}
            error={errors.aadharCardNumber?.message}
          />
          <FormInput
            label="Degree"
            id="degree"
            register={register("degree")}
            error={errors.degree?.message}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Clinic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Clinic Name"
            id="clinicName"
            register={register("clinicName")}
            error={errors.clinicName?.message}
          />
          <FormInput
            label="Clinic Location"
            id="clinicLocation"
            register={register("clinicLocation")}
            error={errors.clinicLocation?.message}
          />
          <FormInput
            label="Latitude"
            id="latitude"
            type="number"
            step="any"
            register={register("latitude")}
            error={errors.latitude?.message}
          />
          <FormInput
            label="Longitude"
            id="longitude"
            type="number"
            step="any"
            register={register("longitude")}
            error={errors.longitude?.message}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Documents</h2>
        <div className="grid grid-cols-1 gap-6">
          <FormFileInput
            label="10th Marksheet"
            id="tenthMarksheet"
            register={register("tenthMarksheet")}
            error={errors.tenthMarksheet?.message}
          />
          <FormFileInput
            label="12th Marksheet"
            id="twelfthMarksheet"
            register={register("twelfthMarksheet")}
            error={errors.twelfthMarksheet?.message}
          />
          <FormFileInput
            label="Degree Certificate"
            id="degreeCertificate"
            register={register("degreeCertificate")}
            error={errors.degreeCertificate?.message}
          />
          <FormFileInput
            label="Doctor Photograph"
            id="doctorPhotograph"
            register={register("doctorPhotograph")}
            error={errors.doctorPhotograph?.message}
          />
          <FormFileInput
            label="First Year Marksheet"
            id="firstYearMarksheet"
            register={register("firstYearMarksheet")}
            error={errors.firstYearMarksheet?.message}
          />
          <FormFileInput
            label="Second Year Marksheet"
            id="secondYearMarksheet"
            register={register("secondYearMarksheet")}
            error={errors.secondYearMarksheet?.message}
          />
          <FormFileInput
            label="Third Year Marksheet"
            id="thirdYearMarksheet"
            register={register("thirdYearMarksheet")}
            error={errors.thirdYearMarksheet?.message}
          />
          <FormFileInput
            label="Fourth Year Marksheet"
            id="fourthYearMarksheet"
            register={register("fourthYearMarksheet")}
            error={errors.fourthYearMarksheet?.message}
          />
          <FormFileInput
            label="Fifth Year Marksheet"
            id="fifthYearMarksheet"
            register={register("fifthYearMarksheet")}
            error={errors.fifthYearMarksheet?.message}
          />
          <FormFileInput
            label="MCI Registration"
            id="mciRegistration"
            register={register("mciRegistration")}
            error={errors.mciRegistration?.message}
          />
          <FormFileInput
            label="Clinic Photographs"
            id="clinicPhotographs"
            register={register("clinicPhotographs")}
            error={errors.clinicPhotographs?.message}
          />
        </div>
      </div>

      <SubmitButton isLoading={isLoading}>Submit Registration</SubmitButton>
    </form>
  );
}
