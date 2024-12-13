export const API_BASE_URL = "https://hospital-server-lwyw.onrender.com/api";

export const ROUTES = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  DASHBOARD: {
    DOCTOR: "/doctor/dashboard",
    HOSPITAL: "/hospital/dashboard",
    PHARMACY: "/pharmacy/dashboard",
    USER: "/user/dashboard",
    DIAGNOSTIC: "/diagnostic/dashboard",
    PATHLAB: "/pathlab/dashboard",
    BLOODBANK: "/bloodbank/dashboard",
    ADMIN: "/admin/dashboard"
  },
};

export const ROLES = {
  DOCTOR: "doctor",
  HOSPITAL: "hospital",
  PHARMACY: "pharmacy",
  USER: "user",
  DIAGNOSTIC: "diagnostic",
  PATHLAB: "pathlab",
  BLOODBANK: "bloodbank",
  ADMIN: "admin"
};

export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};