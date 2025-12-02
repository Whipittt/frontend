import "./index.css";
import { createRoot } from "react-dom/client";
// import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./services/authService.tsx";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
