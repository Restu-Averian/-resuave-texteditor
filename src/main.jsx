import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page/index.jsx";
import InstallationPage from "./pages/installation/index.jsx";
import PropsPage from "./pages/props/index.jsx";
import NotFoundPage from "./pages/not-found/index.jsx";
import Layout from "./pages/layout/index.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/installation" element={<InstallationPage />} />
          <Route path="/props" element={<PropsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
