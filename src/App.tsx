import { BrowserRouter, Routes, Route } from "react-router";
import { Home, Welcome } from "./components";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} /> */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
