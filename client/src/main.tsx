import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import SEOProvider from "./seo/SEOProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SEOProvider>
      <App />
    </SEOProvider>
  </React.StrictMode>
);
