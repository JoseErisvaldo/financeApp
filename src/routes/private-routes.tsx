import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/nav-bar";
import { useAuthStore } from "../features/auth/store/auth.store";

export function PrivateRoute() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
