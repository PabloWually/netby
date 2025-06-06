import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RootLayout from "./layout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <RootLayout>
      <AppRoutes />
      <h1 className="text-3xl font-bold text-white underline">Hello world!</h1>
    </RootLayout>
  );
}

export default App;
