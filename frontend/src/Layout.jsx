import "./global.css";
import { ResponsiveAppBar } from "./components/ResponsiveAppBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ResponsiveAppBar />
        {children}
      </QueryClientProvider>
    </>
  );
}
