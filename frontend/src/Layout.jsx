import "./global.css";
import { ResponsiveAppBar } from "./components/ResponsiveAppBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ResponsiveAppBar />
          {children}
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}
