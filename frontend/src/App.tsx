import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Welcome } from "./pages";
import { Login } from "./components";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AuthProvider } from "./utils/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Cycle from "./pages/Cycle"; // Import Cycle Page

export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Welcome />} />
                <Route path="/cycles" element={<Cycle />} />{" "}
                {/* ✅ Added Cycle Route */}
              </Route>

              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </QueryClientProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
