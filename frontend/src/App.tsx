import { BrowserRouter, Routes, Route } from "react-router";
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
            <Route />
          </Routes>
        </QueryClientProvider>
      </LocalizationProvider>
    </BrowserRouter>
  );
}
