import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerSchema } from "../validations/registerSchema";
import { register as registerUser } from "../services/authService";
import { ROLES, GENDERS } from "../config/constants";
import { formatSelectOptions } from "../utils/formatters";
import FormInput from "./forms/FormInput";
import FormSelect from "./forms/FormSelect";
import FormTextarea from "./forms/FormTextarea";
import SubmitButton from "./forms/SubmitButton";

const roleOptions = formatSelectOptions(ROLES);
const genderOptions = formatSelectOptions(GENDERS);

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  console.log("register schema : ", registerSchema);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      console.log("data form files : ", data);
      const res = await registerUser(data);
      console.log("register doc res : ", res);
      toast.success("Registration successful!");
      reset();
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        label="Username"
        id="username"
        register={register("username")}
        error={errors.username?.message}
      />

      <FormInput
        label="Full Name"
        id="name"
        register={register("name")}
        error={errors.name?.message}
      />

      <FormInput
        label="Email"
        id="email"
        type="email"
        register={register("email")}
        error={errors.email?.message}
      />

      <FormInput
        label="Password"
        id="password"
        type="password"
        register={register("password")}
        error={errors.password?.message}
      />

      <FormSelect
        label="Role"
        id="role"
        register={register("role")}
        error={errors.role?.message}
        options={roleOptions}
      />

      <FormInput
        label="Phone Number"
        id="phone"
        type="tel"
        register={register("phone")}
        error={errors.phone?.message}
      />

      <FormInput
        label="Date of Birth"
        id="dateOfBirth"
        type="date"
        register={register("dateOfBirth")}
        error={errors.dateOfBirth?.message}
      />

      <FormSelect
        label="Gender"
        id="gender"
        register={register("gender")}
        error={errors.gender?.message}
        options={genderOptions}
      />

      <FormTextarea
        label="Address"
        id="address"
        register={register("address")}
        error={errors.address?.message}
        rows="3"
      />

      <SubmitButton isLoading={isLoading}>Register</SubmitButton>
    </form>
  );
}
