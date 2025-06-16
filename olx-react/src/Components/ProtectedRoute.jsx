import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/firebaseContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }
  
  return children;
}