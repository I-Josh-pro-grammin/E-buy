import { Navigate, Outlet } from 'react-router-dom'; // FIX: Use 'react-router-dom' (not 'react')
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth || {}); // Ensures auth exists

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute; // FIX: Ensure export is correct
