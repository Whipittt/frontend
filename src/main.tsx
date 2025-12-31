import "./index.css";
import { createRoot } from "react-dom/client";
// import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./services/authService.tsx";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/utils.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-center" duration={2000} />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>
  // </StrictMode>
);
