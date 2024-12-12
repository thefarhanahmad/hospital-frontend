import { Navigate } from 'react-router-dom';
import { getAuthToken, getUserRole } from '../utils/auth';

export default function PrivateRoute({ children, allowedRoles }) {
  const token = getAuthToken();
  const userRole = getUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}