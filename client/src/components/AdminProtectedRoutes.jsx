import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Navigate } from "react-router-dom";

export const AdminProtectedRoutes = ({ children }) => {
  const user = useSelector((state) => state.user.userInfo);
  if (!user) {
    // User not logged in
    toast.error("Please login first");
    return <Navigate to="/auth" />;
  }

  if (user.role !== "admin") {
    // User logged in but is not admin
    toast.error("Access Denied! Admins Only");
    return <Navigate to="/" />;
  }

  return children;
};