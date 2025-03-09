import { Navigate, Outlet } from "react-router";
import { useAuth } from "../utils/useAuth";
import Sidebar from "../components/Sidebar";

export default function ProtectedRoute() {
  const { user } = useAuth();
  console.log("ProtectedRoute user:", user); // Debugging

  return user ? (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex justify-center items-center bg-sky-500">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
