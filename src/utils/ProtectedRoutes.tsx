import { Outlet, Navigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function ProtectedRoutes() {
  // const user = useContext(UserContext);
  const user = true;
  return user ? <Outlet /> : <Navigate to="/home" />;
}
