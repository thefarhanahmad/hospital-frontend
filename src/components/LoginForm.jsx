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
import { useAuth } from '../contexts/AuthContext';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      
      // Update auth context
      authLogin(response.token, response.data.user.role);

      toast.success("Login successful!");

      // Get the role and convert to uppercase for route lookup
      const userRole = response.data.user.role.toUpperCase();
      const dashboardRoute = ROUTES.DASHBOARD[userRole];

      if (!dashboardRoute) {
        throw new Error('Invalid user role');
      }

      navigate(dashboardRoute);
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