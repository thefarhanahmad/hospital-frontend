import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginSchema } from "../validations/loginSchema";
import { login } from "../services/authService";
import { setAuthToken, setUserRole } from "../utils/auth";
import { ROUTES } from "../config/constants";
import FormInput from "./forms/FormInput";
import SubmitButton from "./forms/SubmitButton";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await login(data);

      // Store auth data
      setAuthToken(response.token);
      setUserRole(response.data.user.role);

      toast.success("Login successful!");
      console.log("response : ", response);
      // Redirect based on role
      const dashboardRoute =
        ROUTES.DASHBOARD[response.data.user.role.toUpperCase()];
      navigate(dashboardRoute);

      // reset();
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

      <SubmitButton isLoading={isLoading}>Login</SubmitButton>
    </form>
  );
}
