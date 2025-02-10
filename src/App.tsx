import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Welcome, Project } from "./components";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Welcome />} />
            {/* <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} /> */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/project/:id" element={<Project />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
}
