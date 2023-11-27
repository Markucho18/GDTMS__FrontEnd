import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ContextoProvider } from "./Contexto";
import { TokenContextProvider } from "./contexts/TokenContext";
import { ModalContextProvider} from './contexts/ModalContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TokenContextProvider>
    <ModalContextProvider>
      <ContextoProvider>
        <App />
      </ContextoProvider>
    </ModalContextProvider>
  </TokenContextProvider>
);
