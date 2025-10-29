import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { SettingProvider } from "./store/SettingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SettingProvider>
        <App />
      </SettingProvider>
    </BrowserRouter>
  </StrictMode>
);
