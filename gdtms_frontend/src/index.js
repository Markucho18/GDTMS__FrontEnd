import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ContextoProvider } from "./Contexto";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextoProvider>
      <App />
    </ContextoProvider>
  </React.StrictMode>
);
