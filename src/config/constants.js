export const API_BASE_URL = "https://hospital-server-lwyw.onrender.com/api";

export const ROUTES = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  DASHBOARD: {
    DOCTOR: "/doctor/dashboard",
    HOSPITAL: "/hospital/dashboard",
    PHARMEASY: "/pharmeasy/dashboard",
    USER: "/user/dashboard",
  },
};

export const ROLES = {
  DOCTOR: "doctor",
  HOSPITAL: "hospital",
  PHARMEASY: "pharmeasy",
  USER: "user",
};

export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};
