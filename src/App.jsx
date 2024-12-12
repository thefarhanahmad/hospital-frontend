import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import HospitalDashboard from './components/dashboards/HospitalDashboard';
import PharmeasyDashboard from './components/dashboards/PharmeasyDashboard';
import UserDashboard from './components/dashboards/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import { ROLES } from './config/constants';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Hospital Management System
            </h2>
            <div className="mt-4 space-x-4">
              <Link
                to="/register"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <Routes>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route
                path="/doctor/dashboard"
                element={
                  <PrivateRoute allowedRoles={[ROLES.DOCTOR]}>
                    <DoctorDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/hospital/dashboard"
                element={
                  <PrivateRoute allowedRoles={[ROLES.HOSPITAL]}>
                    <HospitalDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pharmeasy/dashboard"
                element={
                  <PrivateRoute allowedRoles={[ROLES.PHARMEASY]}>
                    <PharmeasyDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user/dashboard"
                element={
                  <PrivateRoute allowedRoles={[ROLES.USER]}>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={
                  <div className="text-center text-gray-600">
                    Please login or register to continue
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;