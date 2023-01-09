import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthProvider/useAuth';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  let location = useLocation();

  if (!auth.token || !auth._id || !auth.username) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
