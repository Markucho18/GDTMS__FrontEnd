import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ContextoProvider } from "./Contexto";
import { TokenContextProvider } from "./contexts/TokenContext";
import { ModalContextProvider} from './contexts/ModalContext';
import { MainContextProvider } from "./contexts/MainContext";
import { EtiquetaContextProvider } from "./contexts/EtiquetaContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MainContextProvider>
    <EtiquetaContextProvider>
      <TokenContextProvider>
        <ModalContextProvider>
            <App />
        </ModalContextProvider>
      </TokenContextProvider>
    </EtiquetaContextProvider>
  </MainContextProvider>
);
